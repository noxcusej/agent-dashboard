import TopBar from '../components/layout/TopBar.jsx'
import ApiKeyForm from '../components/settings/ApiKeyForm.jsx'

export default function SettingsPage() {
  return (
    <div>
      <TopBar title="Settings" />
      <div className="p-6 max-w-2xl">
        <ApiKeyForm />
      </div>
    </div>
  )
}
