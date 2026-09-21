import React, { useState } from 'react';
import type { Employee, MasterData } from '../../types/employee';

interface EmployeeFormModalProps {
  isOpen: boolean;
  employeeToEdit: Employee | null;
  existingEmployees: Employee[];
  masters: MasterData;
  onClose: () => void;
  onSave: (employee: Employee, isEdit: boolean) => Promise<{ success: boolean; error?: string }>;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  employeeToEdit,
  existingEmployees,
  masters,
  onClose,
  onSave,
}) => {
  const isEdit = Boolean(employeeToEdit);

  const [formData, setFormData] = useState<Employee>(() => {
    if (employeeToEdit) {
      return {
        ...employeeToEdit,
        components: {
          HRA: employeeToEdit.components?.HRA ?? Math.round((employeeToEdit.basic || 0) * 0.4),
          Conveyance: employeeToEdit.components?.Conveyance ?? 2000,
          PF: employeeToEdit.components?.PF ?? Math.round((employeeToEdit.basic || 0) * 0.12),
        },
      };
    }
    const defaultBasic = 40000;
    return {
      id: '',
      first: '',
      middle: '',
      last: '',
      dob: '',
      gender: 'Male',
      mobile: '',
      personalEmail: '',
      officialEmail: '',
      address: '',
      emergencyName: '',
      emergencyMobile: '',
      department: masters.departments[0]?.name || 'Engineering',
      designation: masters.designations[0]?.name || 'Sr. Product Manager',
      employmentType: masters.employmentTypes[0]?.name || 'Permanent',
      category: masters.employeeCategories[0]?.name || 'Staff',
      manager: 'Jane Doe',
      joining: new Date().toISOString().slice(0, 10),
      location: masters.locations[0]?.name || 'Mumbai HO',
      shift: masters.shifts[0]?.name || 'General Shift',
      status: 'Active',
      basic: defaultBasic,
      bank: '',
      photo: '',
      components: {
        HRA: Math.round(defaultBasic * 0.4),
        Conveyance: 2000,
        PF: Math.round(defaultBasic * 0.12),
      },
    };
  });

  const [docCategory, setDocCategory] = useState<string>(
    masters.documentCategories[0]?.name || 'Identity Document'
  );
  const [fileName, setFileName] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof Employee, value: string | number) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'basic') {
        const num = Number(value) || 0;
        updated.basic = num;
        updated.components = {
          ...prev.components,
          HRA: Math.round(num * 0.4),
          PF: Math.round(num * 0.12),
        };
      }
      return updated;
    });
  };

  const handleComponentChange = (comp: 'HRA' | 'Conveyance' | 'PF', value: string) => {
    const num = Number(value) || 0;
    setFormData((prev) => ({
      ...prev,
      components: {
        ...prev.components,
        [comp]: num,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const res = await onSave(formData, isEdit);
    if (!res.success) {
      setValidationError(res.error || 'Please fill in all required fields.');
    } else {
      onClose();
    }
  };

  const managerOptions = [
    'Jane Doe',
    ...existingEmployees
      .filter((e) => (isEdit ? e.id !== employeeToEdit?.id : true))
      .map((e) => `${e.first} ${e.last}`),
  ];

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
        aria-labelledby="formModalTitle"
      >
        {/* Modal Head */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <h3 id="formModalTitle" className="text-base font-bold text-slate-900">
            {isEdit ? 'Edit Employee' : 'Add Employee'}
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

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {validationError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {validationError}
              </div>
            )}

            {/* 1. Personal Details */}
            <section className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                1. Personal Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Employee ID <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. E004"
                    disabled={isEdit}
                    value={formData.id}
                    onChange={(e) => handleFieldChange('id', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 disabled:bg-slate-100 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    First Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.first}
                    onChange={(e) => handleFieldChange('first', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middle || ''}
                    onChange={(e) => handleFieldChange('middle', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Last Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.last}
                    onChange={(e) => handleFieldChange('last', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob || ''}
                    onChange={(e) => handleFieldChange('dob', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={formData.gender || 'Male'}
                    onChange={(e) => handleFieldChange('gender', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => handleFieldChange('mobile', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Personal Email
                  </label>
                  <input
                    type="email"
                    value={formData.personalEmail || ''}
                    onChange={(e) => handleFieldChange('personalEmail', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Official Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.officialEmail}
                    onChange={(e) => handleFieldChange('officialEmail', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-3">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Address</label>
                  <textarea
                    value={formData.address || ''}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors min-h-[64px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyName || ''}
                    onChange={(e) => handleFieldChange('emergencyName', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Emergency Contact Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyMobile || ''}
                    onChange={(e) => handleFieldChange('emergencyMobile', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* 2. Employment Details */}
            <section className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                2. Employment Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Department <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleFieldChange('department', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Designation <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.designation}
                    onChange={(e) => handleFieldChange('designation', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.designations.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Employment Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => handleFieldChange('employmentType', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.employmentTypes.map((et) => (
                      <option key={et.id} value={et.name}>
                        {et.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Employee Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.employeeCategories.map((ec) => (
                      <option key={ec.id} value={ec.name}>
                        {ec.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Reporting Manager
                  </label>
                  <select
                    value={formData.manager}
                    onChange={(e) => handleFieldChange('manager', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {managerOptions.map((mgr) => (
                      <option key={mgr} value={mgr}>
                        {mgr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Joining Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.joining}
                    onChange={(e) => handleFieldChange('joining', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Location <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Assigned Shift <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.shift}
                    onChange={(e) => handleFieldChange('shift', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.shifts.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Employee Status <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleFieldChange('status', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 3. Salary & Bank Details */}
            <section className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                3. Salary & Bank Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Basic Salary (₹) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.basic}
                    onChange={(e) => handleFieldChange('basic', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">HRA (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.components.HRA}
                    onChange={(e) => handleComponentChange('HRA', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Conveyance (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.components.Conveyance}
                    onChange={(e) => handleComponentChange('Conveyance', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    PF Deduction (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.components.PF}
                    onChange={(e) => handleComponentChange('PF', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Bank Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC ••••2341"
                    value={formData.bank || ''}
                    onChange={(e) => handleFieldChange('bank', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Avatar Initials
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder={(formData.first[0] || '') + (formData.last[0] || '') || 'RF'}
                    value={formData.photo || ''}
                    onChange={(e) => handleFieldChange('photo', e.target.value.toUpperCase())}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* 4. Identity Documents */}
            <section className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                4. Identity Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Document Category
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                  >
                    {masters.documentCategories
                      .filter((c) => c.applies === 'Employee')
                      .map((dc) => (
                        <option key={dc.id} value={dc.name}>
                          {dc.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Upload File</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                  {fileName && (
                    <small className="text-[11px] text-slate-500 block mt-1">
                      Selected: {fileName}
                    </small>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Modal Foot */}
          <div className="px-6 py-3 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 shrink-0">
            <button
              type="button"
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 cursor-pointer transition-colors shadow-xs"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              {isEdit ? 'Save Changes' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
