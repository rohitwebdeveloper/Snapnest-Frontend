import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOffIcon from '@mui/icons-material/PersonOff';


const SettingsActions = ({ onChangePassword, onLogout, onDeleteAccount, loading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <button
        onClick={onChangePassword}
        className="w-full p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition shadow-sm text-left text-sm font-medium text-blue-800"
      >
        <PasswordIcon /> Change Password
      </button>
      <button
        className="w-full p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition shadow-sm text-left text-sm font-medium text-blue-800"
        onClick={onLogout}
        disabled={loading}
      >
        <LogoutIcon /> Logout
      </button>
      <button
        onClick={onDeleteAccount}
        className="w-full p-4 rounded-xl bg-red-50 hover:bg-red-100 transition shadow-sm text-left text-sm font-medium text-red-700"
      >
        <PersonOffIcon /> Delete Account
      </button>
    </div>
  );
};

export default SettingsActions;
