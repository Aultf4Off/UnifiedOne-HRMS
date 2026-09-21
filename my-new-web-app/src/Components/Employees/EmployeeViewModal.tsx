import React from 'react';
import type { Employee, EmployeeDocument } from '../../types/employee';

interface EmployeeViewModalProps {
  employee: Employee | null;
  documents: EmployeeDocument[];
  onClose: () => void;
  onEdit: (employee: Employee) => void;
}

function formatMoney(amount: number | undefined): string {
  if (amount === undefined || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

function getStatusBadgeClasses(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Inactive':
    case 'Separated':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200';
  }
}

export const EmployeeViewModal: React.FC<EmployeeViewModalProps> = ({
  employee,
  documents,
  onClose,
  onEdit,
}) => {
  if (!employee) return null;

  const empDocs = documents.filter((d) => d.employee === employee.id);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewModalTitle"
      >
        {/* Modal Head */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <h3 id="viewModalTitle" className="text-base font-bold text-slate-900">
            {employee.first} {employee.last} · {employee.id}
          </h3>
          <button
            type="button"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Profile Header Banner */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-xl grid place-items-center shadow-xs shrink-0">
              {employee.photo || (employee.first[0] + employee.last[0]).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {employee.first} {employee.middle ? employee.middle + ' ' : ''}
                {employee.last}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                {employee.designation} · {employee.department}
              </div>
              <div className="mt-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClasses(
                    employee.status
                  )}`}
                >
                  {employee.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Official Email
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block truncate">
                {employee.officialEmail || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Mobile Number
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.mobile || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Joining Date
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.joining || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Reporting Manager
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.manager || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Location
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.location || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Assigned Shift
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.shift || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Employment Type
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.employmentType || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Employee Category
              </span>
              <strong className="text-xs font-semibold text-slate-900 mt-1 block">
                {employee.category || '—'}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Basic Salary
              </span>
              <strong className="text-xs font-semibold text-emerald-700 mt-1 block">
                {formatMoney(employee.basic)}
              </strong>
            </div>
          </div>

          {/* Bottom Grid: Salary Structure & Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Salary Structure Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Salary Structure
              </h4>
              <div className="overflow-hidden rounded-lg border border-slate-100">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="p-2.5">Component</th>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    <tr>
                      <td className="p-2.5 font-semibold">Basic</td>
                      <td className="p-2.5 text-slate-500">Earning</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">
                        {formatMoney(employee.basic)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">HRA</td>
                      <td className="p-2.5 text-slate-500">Earning</td>
                      <td className="p-2.5 text-right">{formatMoney(employee.components?.HRA)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Conveyance</td>
                      <td className="p-2.5 text-slate-500">Earning</td>
                      <td className="p-2.5 text-right">
                        {formatMoney(employee.components?.Conveyance)}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-2.5 font-semibold text-rose-700">PF Deduction</td>
                      <td className="p-2.5 text-rose-500">Deduction</td>
                      <td className="p-2.5 text-right text-rose-700 font-semibold">
                        {formatMoney(employee.components?.PF)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Documents Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Employee Documents
              </h4>
              {empDocs.length > 0 ? (
                <div className="space-y-2">
                  {empDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <b className="text-xs font-bold text-slate-900 block truncate">
                          {doc.title}
                        </b>
                        <small className="text-[11px] text-slate-500 block truncate mt-0.5">
                          {doc.category} · {doc.file}
                        </small>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                  No uploaded documents for this employee
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Foot */}
        <div className="px-6 py-3 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 shrink-0">
          <button
            type="button"
            className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 cursor-pointer transition-colors shadow-xs"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors"
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewModal;
