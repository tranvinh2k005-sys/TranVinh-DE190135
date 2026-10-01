export const COURSES = [
  { id: 'react', name: 'ReactJS cơ bản', fee: 2500000 },
  { id: 'node', name: 'NodeJS & Express', fee: 3000000 },
  { id: 'fullstack', name: 'Fullstack MERN', fee: 5000000 },
];

export const SCHEDULES = ['Sáng 2-4-6', 'Tối 3-5-7', 'Cuối tuần'];

export const STEPS = ['1. Thông tin', '2. Khóa học', '3. Xác nhận'];

export const STEP_FIELDS = [
  ['fullName', 'email', 'phone'],
  ['courseId', 'schedule'],
  ['agreed'],
];

export const validateField = (name, values) => {
  const v = values[name];
  switch (name) {
    case 'fullName':
      if (!v || v.trim().length < 3) return 'Họ tên phải có ít nhất 3 ký tự';
      return '';
    case 'email':
      if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Email không đúng định dạng';
      return '';
    case 'phone':
      if (!v || !/^0\d{9}$/.test(v.trim())) return 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
      return '';
    case 'courseId':
      if (!v) return 'Chọn khóa học';
      return '';
    case 'schedule':
      if (!v) return 'Chọn lịch học';
      return '';
    case 'agreed':
      if (!v) return 'Vui lòng xác nhận thông tin';
      return '';
    default:
      return '';
  }
};

export const validateStep = (step, values) => {
  const fields = STEP_FIELDS[step] || [];
  return fields.reduce((acc, field) => {
    const error = validateField(field, values);
    if (error) acc[field] = error;
    return acc;
  }, {});
};

export const initWizard = (initialCourseId = 'react') => ({
  step: 0,
  maxVisited: 0,
  values: {
    fullName: '',
    email: '',
    phone: '',
    courseId: initialCourseId,
    schedule: '',
    agreed: false,
  },
  errors: {},
  submitted: false,
});

export const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload;
      const newValues = { ...state.values, [name]: value };
      const newErrors = { ...state.errors };
      if (state.errors[name]) {
        const err = validateField(name, newValues);
        if (err) {
          newErrors[name] = err;
        } else {
          delete newErrors[name];
        }
      }
      return {
        ...state,
        values: newValues,
        errors: newErrors,
      };
    }
    case 'NEXT': {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) {
        return { ...state, errors };
      }
      const nextStep = Math.min(STEPS.length - 1, state.step + 1);
      return {
        ...state,
        step: nextStep,
        maxVisited: Math.max(state.maxVisited, nextStep),
        errors: {},
      };
    }
    case 'BACK': {
      return {
        ...state,
        step: Math.max(0, state.step - 1),
        errors: {},
      };
    }
    case 'GO_TO': {
      const target = action.payload;
      if (target >= 0 && target <= state.maxVisited && target < STEPS.length) {
        return {
          ...state,
          step: target,
          errors: {},
        };
      }
      return state;
    }
    case 'SUBMIT': {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) {
        return { ...state, errors };
      }
      return {
        ...state,
        submitted: true,
        errors: {},
      };
    }
    case 'RESET': {
      return initWizard(action.payload);
    }
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`);
  }
};
