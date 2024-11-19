const validateInputs = (newUser, newPassword, newPasswordRepeat) => {
  if (!newUser.trim() || !newPassword.trim()) {
    return "لطفاً تمامی فیلدها را پر کنید.";
  }
  if (newPassword !== newPasswordRepeat) {
    return "رمز عبور با تکرار آن مطابقت ندارد!";
  }
  if (newPassword.length < 6) {
    return "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  }
  if (newUser.length < 3) {
    return "نام کاربری باید حداقل ۳ کاراکتر باشد.";
  }
  return null;
};

export default validateInputs;
