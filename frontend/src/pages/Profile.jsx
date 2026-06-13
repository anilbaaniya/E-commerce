import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateUserProfile, updatePassword } from "../features/auth/authSlice";

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
      {initials}
    </div>
  );
}

function Field({ label, value, hide }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
        {label}
      </span>
      <span className="text-sm font-medium text-black">
        {hide ? "••••••••" : value}
      </span>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function Profile({ overlay = false, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});

  const [pw, setPw] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [pwErrors, setPwErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validateProfile = () => {
    const err = {};
    if (!form.name) err.name = "Name required";
    if (!form.email) err.email = "Email required";
    return err;
  };

  const saveProfile = async () => {
    const err = validateProfile();
    if (Object.keys(err).length) return setErrors(err);

    setLoadingSubmit(true);
    try {
      const result = await dispatch(
        updateUserProfile({
          name: form.name,
          email: form.email,
        }),
      ).unwrap();
      toast.success("Profile updated successfully");
      setErrors({});
      setEditing(false);
    } catch (error) {
      toast.error(error || "Failed to update profile");
      setErrors({ submit: error });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const validatePassword = () => {
    const err = {};
    if (!pw.current) err.current = "Required";
    if (!pw.next || pw.next.length < 8) err.next = "Min 8 characters required";
    if (pw.next !== pw.confirm) err.confirm = "Passwords not match";
    return err;
  };

  const savePassword = async () => {
    const err = validatePassword();
    if (Object.keys(err).length) return setPwErrors(err);

    setLoadingSubmit(true);
    try {
      await dispatch(
        updatePassword({
          currentPassword: pw.current,
          password: pw.next,
          confirmPassword: pw.confirm,
        }),
      ).unwrap();
      toast.success("Password updated successfully");
      setPwErrors({});
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setChangingPassword(false);
        setPw({ current: "", next: "", confirm: "" });
      }, 1500);
    } catch (error) {
      toast.error(error || "Failed to update password");
      setPwErrors({ submit: error });
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative h-full w-full max-w-140 overflow-y-auto bg-stone-100 p-6 font-sans shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          <div className="pt-8">
            <ProfileContent
              user={user}
              editing={editing}
              setEditing={setEditing}
              form={form}
              handleChange={handleChange}
              errors={errors}
              saveProfile={saveProfile}
              loadingSubmit={loadingSubmit}
              changingPassword={changingPassword}
              setChangingPassword={setChangingPassword}
              pw={pw}
              setPw={setPw}
              pwErrors={pwErrors}
              savePassword={savePassword}
              success={success}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-md bg-stone-100 p-6 rounded-xl"
      style={{ marginTop: "40px" }}
    >
      <ProfileContent
        user={user}
        editing={editing}
        setEditing={setEditing}
        form={form}
        handleChange={handleChange}
        errors={errors}
        saveProfile={saveProfile}
        loadingSubmit={loadingSubmit}
        changingPassword={changingPassword}
        setChangingPassword={setChangingPassword}
        pw={pw}
        setPw={setPw}
        pwErrors={pwErrors}
        savePassword={savePassword}
        success={success}
      />
    </div>
  );
}

function ProfileContent({
  user,
  editing,
  setEditing,
  form,
  handleChange,
  errors,
  saveProfile,
  loadingSubmit,
  changingPassword,
  setChangingPassword,
  pw,
  setPw,
  pwErrors,
  savePassword,
  success,
}) {
  return (
    <div className="w-full max-w-md bg-stone-100 p-6 rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-sm text-gray-500">Manage profile and security</p>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {/* Top */}
        <div className="flex items-center gap-4 p-5 border-b">
          <Avatar name={user.name} />
          <div>
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Profile */}
        <div className="p-5 border-b">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-sm">Profile</span>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600 text-xs font-semibold"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-3">
              <Input
                label="Name"
                value={form.name}
                onChange={handleChange("name")}
                error={errors.name}
              />

              <Input
                label="Email"
                value={form.email}
                onChange={handleChange("email")}
                error={errors.email}
              />

              <div className="flex gap-2">
                <button
                  onClick={saveProfile}
                  disabled={loadingSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingSubmit ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 border py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Field label="Name" value={user.name} />
              <Field label="Email" value={user.email} />
            </div>
          )}
        </div>

        {/* Password */}
        <div className="p-5">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-sm">Password</span>
            {!changingPassword && (
              <button
                onClick={() => setChangingPassword(true)}
                className="text-blue-600 text-xs font-semibold"
              >
                Change
              </button>
            )}
          </div>

          {changingPassword ? (
            success ? (
              <p className="text-green-600 text-sm text-center">
                Password updated
              </p>
            ) : (
              <div className="space-y-3">
                <Input
                  label="Current"
                  type="password"
                  value={pw.current}
                  onChange={(e) => setPw({ ...pw, current: e.target.value })}
                  error={pwErrors.current}
                />

                <Input
                  label="New"
                  type="password"
                  value={pw.next}
                  onChange={(e) => setPw({ ...pw, next: e.target.value })}
                  error={pwErrors.next}
                />

                <Input
                  label="Confirm"
                  type="password"
                  value={pw.confirm}
                  onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                  error={pwErrors.confirm}
                />

                <div className="flex gap-2">
                  <button
                    onClick={savePassword}
                    disabled={loadingSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingSubmit ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => setChangingPassword(false)}
                    className="flex-1 border py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )
          ) : (
            <Field label="Password" value="password" hide />
          )}
        </div>
      </div>
    </div>
  );
}
