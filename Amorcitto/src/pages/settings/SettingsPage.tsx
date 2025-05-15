// src/pages/settings/SettingsPage.tsx
import { Typography } from "@mui/material";

const SettingsPage = () => (
  <div className="p-6">
    <Typography variant="h5">⚙️ Settings</Typography>
    <p className="text-gray-600 mt-4">Settings module coming soon. This will include:</p>
    <ul className="list-disc ml-6 mt-2 text-gray-700">
      <li>User role and permission management</li>
      <li>Receipt customization</li>
      <li>Store profile and preferences</li>
    </ul>
  </div>
);

export default SettingsPage;
