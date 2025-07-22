import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    gender: '',
    role: '',
  });

  const [errors, setErrors] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    gender: '',
    role: '',
  });

  const validateStep = () => {
    const newErrors: FormData = {
      name: '',
      email: '',
      phone: '',
      gender: '',
      role: '',
    };

    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email';
      }
    }

    if (step === 2) {
      if (!formData.phone) newErrors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be 10 digits';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 3) {
      if (!formData.role) newErrors.role = 'Role is required';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((msg) => msg === '');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      alert('Form Submitted' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 space-y-4" onSubmit={handleSubmit}>
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
