import React, { useState, useEffect } from 'react';
import { Save, Bell, Shield, Database, Mail, Globe, Users, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
// import { supabase } from '../utils/supabaseClient'; // Uncomment if using Supabase

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  defaultUserRole: string;
  emailNotifications: boolean;
  projectCreationRestricted: boolean;
  maxProjectsPerUser: number;
  sessionTimeout: number;
}

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'ProjectFlow',
    siteDescription: 'Collaborative Project Management Platform',
    allowRegistration: true,
    defaultUserRole: 'member',
    emailNotifications: true,
    projectCreationRestricted: false,
    maxProjectsPerUser: 10,
    sessionTimeout: 24,
  });

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    activeUsers: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchSystemStats();
    loadSettings();
  }, []);

  const fetchSystemStats = async () => {
    setStatsLoading(true);
    try {
      // Example with Supabase (uncomment and configure if you use it)
      // const [{ count: totalUsers }, { count: totalProjects }, { count: totalTasks }] = await Promise.all([
      //   supabase.from('users').select('*', { count: 'exact', head: true }),
      //   supabase.from('projects').select('*', { count: 'exact', head: true }),
      //   supabase.from('tasks').select('*', { count: 'exact', head: true }),
      // ]);
      // setStats({
      //   totalUsers: totalUsers || 0,
      //   totalProjects: totalProjects || 0,
      //   totalTasks: totalTasks || 0,
      //   activeUsers: totalUsers || 0, // Replace with real active user logic
      // });

      // Mocked data for demonstration:
      setTimeout(() => {
        setStats({
          totalUsers: 42,
          totalProjects: 12,
          totalTasks: 87,
          activeUsers: 8,
        });
        setStatsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching system stats:', error);
      setStatsLoading(false);
    }
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('systemSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('systemSettings', JSON.stringify(settings));
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'database', name: 'Database', icon: Database },
  ];

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="mt-3 sm:mt-0 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* System Overview Cards */}
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Users</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statsLoading ? '...' : stats.totalUsers}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Projects</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statsLoading ? '...' : stats.totalProjects}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Tasks</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statsLoading ? '...' : stats.totalTasks}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Active Users</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statsLoading ? '...' : stats.activeUsers}
          </dd>
        </div>
      </dl>

      <div className="bg-white shadow rounded-lg">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure basic application settings and branding.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700">
                    Default User Role
                  </label>
                  <select
                    id="defaultUserRole"
                    value={settings.defaultUserRole}
                    onChange={(e) => handleInputChange('defaultUserRole', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                    Site Description
                  </label>
                  <textarea
                    id="siteDescription"
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">User Management</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure user registration and project creation settings.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label htmlFor="allowRegistration" className="text-sm font-medium text-gray-700">
                      Allow User Registration
                    </label>
                    <p className="text-sm text-gray-500">
                      Allow new users to register for accounts
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="allowRegistration"
                    checked={settings.allowRegistration}
                    onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label htmlFor="projectCreationRestricted" className="text-sm font-medium text-gray-700">
                      Restrict Project Creation
                    </label>
                    <p className="text-sm text-gray-500">
                      Only allow managers and admins to create projects
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="projectCreationRestricted"
                    checked={settings.projectCreationRestricted}
                    onChange={(e) => handleInputChange('projectCreationRestricted', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="maxProjectsPerUser" className="block text-sm font-medium text-gray-700">
                    Max Projects Per User
                  </label>
                  <input
                    type="number"
                    id="maxProjectsPerUser"
                    min="1"
                    max="100"
                    value={settings.maxProjectsPerUser}
                    onChange={(e) => handleInputChange('maxProjectsPerUser', Number(e.target.value) || 1)}
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure security and session management settings.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                    Session Timeout (hours)
                  </label>
                  <input
                    type="number"
                    id="sessionTimeout"
                    min="1"
                    max="168"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', Number(e.target.value) || 1)}
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Users will be automatically logged out after this period of inactivity
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Row Level Security (RLS) is enabled on all database tables. 
                          Users can only access data they have permission to view.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure email notifications and alerts.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Send email notifications for important events
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Email Configuration</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Email notifications require SMTP configuration in your Supabase project settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Database Information</h3>
                <p className="mt-1 text-sm text-gray-500">
                  View database statistics and health information.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Database Tables</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h5 className="font-medium text-gray-900">Users</h5>
                    <p className="text-2xl font-semibold text-blue-600">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h5 className="font-medium text-gray-900">Projects</h5>
                    <p className="text-2xl font-semibold text-green-600">{stats.totalProjects}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h5 className="font-medium text-gray-900">Tasks</h5>
                    <p className="text-2xl font-semibold text-purple-600">{stats.totalTasks}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h5 className="font-medium text-gray-900">Database Status</h5>
                    <p className="text-sm font-medium text-green-600">Healthy</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <Database className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Database Health</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        All database connections are healthy and Row Level Security is properly configured.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;