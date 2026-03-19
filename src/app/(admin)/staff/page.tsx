'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { staffApi } from '@/lib/api/staffApi';
import { employeeSchema, EmployeeFormData } from '@/lib/validation/schemas';
import { formatCurrency, formatDate, getInitials } from '@/lib/utils';
import { PageHeader, Pagination, PageLoader, SearchBar, EmptyState, Modal, StatusBadge } from '@/components/ui';
import { UserCog, Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const DEPARTMENTS = ['Front Desk', 'Housekeeping', 'Catering', 'Maintenance', 'Security', 'Administration', 'Finance'];

export default function StaffPage() {
  const [page,   setPage]   = useState(0);
  const [search, setSearch] = useState('');
  const [dept,   setDept]   = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['staff', page, search, dept],
    queryFn:  () => staffApi.getEmployees({ page, size: 15, search: search || undefined, department: dept || undefined }),
  });

 const roles = [
   { id: 'MANAGER',  name: 'Manager'  },
   { id: 'STAFF',    name: 'Staff'    },
   { id: 'FINANCE',  name: 'Finance'  },
 ];

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const create = useMutation({
    mutationFn: staffApi.createEmployee,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['staff'] });
      toast.success('Employee added');
      setModalOpen(false);
      reset();
    },
    onError: () => toast.error('Failed to add employee'),
  });

  const deactivate = useMutation({
    mutationFn: staffApi.deactivateEmployee,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['staff'] }); toast.success('Employee deactivated'); },
    onError:   () => toast.error('Failed to deactivate'),
  });

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Staff Management"
        subtitle="Employee profiles, roles and schedules"
        actions={
          <button onClick={() => setModalOpen(true)} className="btn-primary">
            <Plus size={15} /> Add Employee
          </button>
        }
      />

      <div className="card mb-5 flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Search staff…" />
        <select value={dept} onChange={e => setDept(e.target.value)} className="input w-48">
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {isLoading ? <PageLoader /> : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Hire Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.content.length === 0 ? (
                <tr><td colSpan={7}><EmptyState icon={<UserCog size={40} />} title="No employees found" /></td></tr>
              ) : (
                data?.content.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-burgundy-100 text-burgundy-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {getInitials(e.firstName, e.lastName)}
                        </div>
                        <div>
                          <div className="font-medium text-stone-900">{e.firstName} {e.lastName}</div>
                          <div className="text-xs text-stone-400">{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-stone-600">{e.department}</td>
                    <td className="text-stone-600">{e.role?.name ?? '—'}</td>
                    <td className="font-medium">{formatCurrency(e.salary)}</td>
                    <td className="text-stone-500">{formatDate(e.hireDate)}</td>
                    <td><StatusBadge status={e.isActive ? 'ACTIVE' : 'INACTIVE'} /></td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400"><Edit size={14} /></button>
                        {e.isActive && (
                          <button
                            onClick={() => { if (confirm('Deactivate this employee?')) deactivate.mutate(e.id); }}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {data && <div className="p-4 border-t border-stone-100"><Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} /></div>}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); reset(); }} title="Add Employee">
        <form onSubmit={handleSubmit(d => create.mutate(d))} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">First Name</label>
              <input {...register('firstName')} className="input" />
              {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="label">Last Name</label>
              <input {...register('lastName')} className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Email</label>
              <input type="email" {...register('email')} className="input" />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Phone</label>
              <input {...register('phone')} className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Department</label>
              <select {...register('department')} className="input">
                <option value="">Select…</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              {errors.department && <p className="form-error">{errors.department.message}</p>}
            </div>
            <div>
              <label className="label">Role</label>
              <select {...register('roleId')} className="input">
                <option value="">Select…</option>
                {roles?.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Salary (RWF)</label>
              <input type="number" {...register('salary', { valueAsNumber: true })} className="input" />
              {errors.salary && <p className="form-error">{errors.salary.message}</p>}
            </div>
            <div>
              <label className="label">Hire Date</label>
              <input type="date" {...register('hireDate')} className="input" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { setModalOpen(false); reset(); }} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
              {isSubmitting ? 'Saving…' : 'Save Employee'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
