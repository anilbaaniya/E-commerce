import { useState } from "react";

const DEFAULT_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  password: "",
};

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold select-none">
      {initials}
    </div>
  );
}

function FieldRow({ label, value, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </span>
      <span className="text-black text-base font-medium">
        {type === "password" ? "••••••••" : value}
      </span>
    </div>
  );
}

function InputField({ label, id, type = "text", value, onChange, error, placeholder, minLength }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={minLength}
        className={`border rounded-lg px-4 py-2.5 text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

export default function Profile() {
  const [user] = useState(DEFAULT_USER);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [errors, setErrors] = useState({});

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [pwSuccess, setPwSuccess] = useState(false);

  const [displayName, setDisplayName] = useState(user.name);
  const [displayEmail, setDisplayEmail] = useState(user.email);

  const handleField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateProfile = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    return e;
  };

  const handleSaveProfile = () => {
    const e = validateProfile();
    if (Object.keys(e).length) { setErrors(e); return; }
    setDisplayName(form.name);
    setDisplayEmail(form.email);
    setEditing(false);
    setErrors({});
  };

  const handleCancelProfile = () => {
    setForm({ name: displayName, email: displayEmail });
    setErrors({});
    setEditing(false);
  };

  const validatePassword = () => {
    const e = {};
    if (!pwForm.current) e.current = "Current password is required.";
    if (!pwForm.next) e.next = "New password is required.";
    else if (pwForm.next.length < 8) e.next = "Password must be at least 8 characters.";
    if (!pwForm.confirm) e.confirm = "Please confirm your new password.";
    else if (pwForm.next !== pwForm.confirm) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSavePassword = () => {
    const e = validatePassword();
    if (Object.keys(e).length) { setPwErrors(e); return; }
    setPwErrors({});
    setPwSuccess(true);
    setPwForm({ current: "", next: "", confirm: "" });
    setTimeout(() => {
      setPwSuccess(false);
      setChangingPassword(false);
    }, 1800);
  };

  const handleCancelPassword = () => {
    setPwForm({ current: "", next: "", confirm: "" });
    setPwErrors({});
    setChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black tracking-tight">Account</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your profile and security settings.</p>
        </div>

        {/* Profile Card */}
        <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Identity strip */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 bg-gray-50">
            <Avatar name={displayName} />
            <div>
              <p className="text-black font-bold text-lg leading-tight">{displayName}</p>
              <p className="text-gray-400 text-sm">{displayEmail}</p>
            </div>
          </div>

          {/* Profile section */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-black font-semibold text-sm">Profile</span>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="flex flex-col gap-4">
                <InputField
                  label="Name"
                  id="name"
                  value={form.name}
                  onChange={handleField("name")}
                  placeholder="Your full name"
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleField("email")}
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={handleCancelProfile}
                    className="flex-1 border border-gray-200 text-black text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <FieldRow label="Name" value={displayName} />
                <FieldRow label="Email" value={displayEmail} />
              </div>
            )}
          </div>

          {/* Password section */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-black font-semibold text-sm">Password</span>
              {!changingPassword && (
                <button
                  onClick={() => setChangingPassword(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  Change
                </button>
              )}
            </div>

            {changingPassword ? (
              <div className="flex flex-col gap-4">
                {pwSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm font-medium text-center">
                    Password updated successfully.
                  </div>
                ) : (
                  <>
                    <InputField
                      label="Current password"
                      id="current-pw"
                      type="password"
                      value={pwForm.current}
                      onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                      error={pwErrors.current}
                    />
                    <InputField
                      label="New password"
                      id="new-pw"
                      type="password"
                      value={pwForm.next}
                      onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                      placeholder="Min. 8 characters"
                      minLength={8}
                      error={pwErrors.next}
                    />
                    <InputField
                      label="Confirm new password"
                      id="confirm-pw"
                      type="password"
                      value={pwForm.confirm}
                      onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                      error={pwErrors.confirm}
                    />
                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={handleSavePassword}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
                      >
                        Update password
                      </button>
                      <button
                        onClick={handleCancelPassword}
                        className="flex-1 border border-gray-200 text-black text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <FieldRow label="Password" value="password" type="password" />
            )}
          </div>

        </div>

        {/* Danger zone */}
        <div className="mt-6 px-6 py-4 border border-red-100 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-black text-sm font-semibold">Delete account</p>
            <p className="text-gray-400 text-xs mt-0.5">Permanently remove all your data.</p>
          </div>
          <button className="text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition">
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
