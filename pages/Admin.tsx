import React, { useMemo, useState } from 'react';
import { z } from 'zod';
import { Button } from '../components/Button';
import { Card } from '../components/GlassCard';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminData } from '../hooks/useAdminData';
import {
  createProject,
  createService,
  createTeamMember,
  createTechCategory,
  deleteProject,
  deleteService,
  deleteTeamMember,
  deleteTechCategory,
  updateProject,
  updateService,
  updateTeamMember,
  updateTechCategory,
} from '../repositories/adminRepository';
import { IService, IProject, ITeamMember, IAITechCategory } from '../types';
import { iconMap } from '../utils/iconMap';

const serviceSchema = z.object({
  title: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(10),
  capabilities: z.array(z.string().min(2)),
  iconName: z.string().min(2),
});

const projectSchema = z.object({
  title: z.string().min(2),
  clientSector: z.string().min(2),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  stats: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
});

const teamSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  bio: z.string().min(10),
  image: z.string().url(),
});

const techSchema = z.object({
  title: z.string().min(2),
  items: z.array(z.string().min(1)),
});

const tabs = ['services', 'projects', 'team', 'tech'] as const;

type Tab = (typeof tabs)[number];

const initialService: Omit<IService, 'id'> = {
  title: '',
  tagline: '',
  description: '',
  capabilities: [],
  iconName: 'BrainCircuit',
};

const initialProject: Omit<IProject, 'id'> = {
  title: '',
  clientSector: '',
  challenge: '',
  solution: '',
  stats: [],
};

const initialTeam: Omit<ITeamMember, 'id'> = {
  name: '',
  role: '',
  bio: '',
  image: '',
};

const initialTech: Omit<IAITechCategory, 'id'> = {
  title: '',
  items: [],
};

export const Admin: React.FC = () => {
  const { user, isLoading: authLoading, error: authError, login, logout } = useAdminAuth();
  const { services, projects, team, techStack, isLoading, error, refresh } = useAdminData();
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editingTechId, setEditingTechId] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState(initialService);
  const [projectForm, setProjectForm] = useState(initialProject);
  const [teamForm, setTeamForm] = useState(initialTeam);
  const [techForm, setTechForm] = useState(initialTech);

  const iconOptions = useMemo(() => Object.keys(iconMap), []);

  const handleLogin = async () => {
    try {
      setFormError(null);
      await login(password);
      setPassword('');
    } catch (err) {
      console.error(err);
      setFormError('Authentication failed.');
    }
  };

  const handleSubmitService = async () => {
    setFormError(null);
    const parsed = serviceSchema.safeParse(serviceForm);
    if (!parsed.success) {
      setFormError('Please fill in all service fields correctly.');
      return;
    }
    setSaving(true);
    try {
      if (editingServiceId) {
        await updateService(editingServiceId, parsed.data);
      } else {
        await createService(parsed.data);
      }
      setServiceForm(initialService);
      setEditingServiceId(null);
      await refresh();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitProject = async () => {
    setFormError(null);
    const parsed = projectSchema.safeParse(projectForm);
    if (!parsed.success) {
      setFormError('Please fill in all project fields correctly.');
      return;
    }
    setSaving(true);
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, parsed.data);
      } else {
        await createProject(parsed.data);
      }
      setProjectForm(initialProject);
      setEditingProjectId(null);
      await refresh();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitTeam = async () => {
    setFormError(null);
    const parsed = teamSchema.safeParse(teamForm);
    if (!parsed.success) {
      setFormError('Please fill in all team fields correctly.');
      return;
    }
    setSaving(true);
    try {
      if (editingTeamId) {
        await updateTeamMember(editingTeamId, parsed.data);
      } else {
        await createTeamMember(parsed.data);
      }
      setTeamForm(initialTeam);
      setEditingTeamId(null);
      await refresh();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save team member.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitTech = async () => {
    setFormError(null);
    const parsed = techSchema.safeParse(techForm);
    if (!parsed.success) {
      setFormError('Please fill in all tech stack fields correctly.');
      return;
    }
    setSaving(true);
    try {
      if (editingTechId) {
        await updateTechCategory(editingTechId, parsed.data);
      } else {
        await createTechCategory(parsed.data);
      }
      setTechForm(initialTech);
      setEditingTechId(null);
      await refresh();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save tech stack category.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center text-muted">Authenticating...</div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <Card>
            <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
            <p className="text-muted mb-6">Enter the admin password to continue.</p>
            {authError && <p className="text-red-600 text-xs font-mono mb-4">{authError}</p>}
            {formError && <p className="text-red-600 text-xs font-mono mb-4">{formError}</p>}
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-paper border border-border rounded-none px-4 py-3 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-mono"
              placeholder="Password"
            />
            <Button className="mt-4 w-full" onClick={handleLogin}>
              Authenticate
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <p className="section-caption text-signal">Admin Panel</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Content Control</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={refresh}>Refresh</Button>
            <Button onClick={logout}>Sign out</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border text-xs font-mono uppercase ${
                activeTab === tab ? 'bg-primary text-background border-primary' : 'border-border text-muted hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {(isLoading || saving) && (
          <div className="text-muted text-xs font-mono mb-4">{saving ? 'Saving...' : 'Loading data...'}</div>
        )}
        {error && <div className="text-red-600 text-xs font-mono mb-4">{error}</div>}
        {formError && <div className="text-red-600 text-xs font-mono mb-4">{formError}</div>}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <h2 className="text-xl font-bold mb-4">Service</h2>
              <div className="space-y-4">
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Title"
                  value={serviceForm.title}
                  onChange={(event) => setServiceForm({ ...serviceForm, title: event.target.value })}
                />
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Tagline"
                  value={serviceForm.tagline}
                  onChange={(event) => setServiceForm({ ...serviceForm, tagline: event.target.value })}
                />
                <textarea
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  rows={3}
                  placeholder="Description"
                  value={serviceForm.description}
                  onChange={(event) => setServiceForm({ ...serviceForm, description: event.target.value })}
                />
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Capabilities (comma separated)"
                  value={serviceForm.capabilities.join(', ')}
                  onChange={(event) =>
                    setServiceForm({
                      ...serviceForm,
                      capabilities: event.target.value.split(',').map((item) => item.trim()).filter(Boolean),
                    })
                  }
                />
                <select
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  value={serviceForm.iconName}
                  onChange={(event) => setServiceForm({ ...serviceForm, iconName: event.target.value })}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <Button onClick={handleSubmitService}>
                  {editingServiceId ? 'Update Service' : 'Add Service'}
                </Button>
              </div>
            </Card>
            <div className="lg:col-span-7 space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                      <p className="text-xs text-muted font-mono">{service.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingServiceId(service.id);
                          setServiceForm({
                            title: service.title,
                            tagline: service.tagline,
                            description: service.description,
                            capabilities: service.capabilities,
                            iconName: service.iconName,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          await deleteService(service.id);
                          refresh();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <h2 className="text-xl font-bold mb-4">Project</h2>
              <div className="space-y-4">
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Title"
                  value={projectForm.title}
                  onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })}
                />
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Client Sector"
                  value={projectForm.clientSector}
                  onChange={(event) => setProjectForm({ ...projectForm, clientSector: event.target.value })}
                />
                <textarea
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  rows={3}
                  placeholder="Challenge"
                  value={projectForm.challenge}
                  onChange={(event) => setProjectForm({ ...projectForm, challenge: event.target.value })}
                />
                <textarea
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  rows={3}
                  placeholder="Solution"
                  value={projectForm.solution}
                  onChange={(event) => setProjectForm({ ...projectForm, solution: event.target.value })}
                />
                <textarea
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  rows={2}
                  placeholder="Stats (label:value, comma separated)"
                  value={projectForm.stats.map((stat) => `${stat.label}:${stat.value}`).join(', ')}
                  onChange={(event) => {
                    const stats = event.target.value
                      .split(',')
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((entry) => {
                        const [label, value] = entry.split(':').map((s) => s.trim());
                        return { label: label ?? '', value: value ?? '' };
                      });
                    setProjectForm({ ...projectForm, stats });
                  }}
                />
                <Button onClick={handleSubmitProject}>
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </Card>
            <div className="lg:col-span-7 space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className="text-xs text-muted font-mono">{project.clientSector}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingProjectId(project.id);
                          setProjectForm({
                            title: project.title,
                            clientSector: project.clientSector,
                            challenge: project.challenge,
                            solution: project.solution,
                            stats: project.stats,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          await deleteProject(project.id);
                          refresh();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <h2 className="text-xl font-bold mb-4">Team Member</h2>
              <div className="space-y-4">
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Name"
                  value={teamForm.name}
                  onChange={(event) => setTeamForm({ ...teamForm, name: event.target.value })}
                />
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Role"
                  value={teamForm.role}
                  onChange={(event) => setTeamForm({ ...teamForm, role: event.target.value })}
                />
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Image URL"
                  value={teamForm.image}
                  onChange={(event) => setTeamForm({ ...teamForm, image: event.target.value })}
                />
                <textarea
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  rows={3}
                  placeholder="Bio"
                  value={teamForm.bio}
                  onChange={(event) => setTeamForm({ ...teamForm, bio: event.target.value })}
                />
                <Button onClick={handleSubmitTeam}>
                  {editingTeamId ? 'Update Member' : 'Add Member'}
                </Button>
              </div>
            </Card>
            <div className="lg:col-span-7 space-y-4">
              {team.map((member) => (
                <Card key={member.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className="text-xs text-muted font-mono">{member.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingTeamId(member.id);
                          setTeamForm({
                            name: member.name,
                            role: member.role,
                            bio: member.bio,
                            image: member.image,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          await deleteTeamMember(member.id);
                          refresh();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <h2 className="text-xl font-bold mb-4">Tech Stack Category</h2>
              <div className="space-y-4">
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Title"
                  value={techForm.title}
                  onChange={(event) => setTechForm({ ...techForm, title: event.target.value })}
                />
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm"
                  placeholder="Items (comma separated)"
                  value={techForm.items.join(', ')}
                  onChange={(event) =>
                    setTechForm({
                      ...techForm,
                      items: event.target.value.split(',').map((item) => item.trim()).filter(Boolean),
                    })
                  }
                />
                <Button onClick={handleSubmitTech}>
                  {editingTechId ? 'Update Category' : 'Add Category'}
                </Button>
              </div>
            </Card>
            <div className="lg:col-span-7 space-y-4">
              {techStack.map((category) => (
                <Card key={category.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{category.title}</h3>
                      <p className="text-xs text-muted font-mono">{category.items.join(', ')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingTechId(category.id);
                          setTechForm({
                            title: category.title,
                            items: category.items,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          await deleteTechCategory(category.id);
                          refresh();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
