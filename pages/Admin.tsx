import React, { useMemo, useState, useRef } from 'react';
import { z } from 'zod';
import { Upload, Image as ImageIcon, X, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';

import { Button } from '../components/Button';
import { Card } from '../components/GlassCard';
import { CloudinaryImage } from '../components/CloudinaryImage';
import { ImageCropper } from '../components/ImageCropper';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminData } from '../hooks/useAdminData';
import {
  createService,
  createProject,
  createTeamMember,
  createTechCategory,
  createCourse,
  deleteProject,
  deleteService,
  deleteTeamMember,
  deleteTechCategory,
  deleteCourse,
  updateProject,
  updateService,
  updateTeamMember,
  updateTechCategory,
  updateCourse,
  updateSiteConfig,
  reorderTeam
} from '../repositories/adminRepository';

import { IService, IProject, ITeamMember, IAITechCategory, ICourse, ISiteConfig } from '../types';

import { SEOFormFields } from '../components/SEOFormFields';
import { iconMap } from '../utils/iconMap';

const serviceSchema = z.object({
  title: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(10),
  capabilities: z.array(z.string().min(2)),
  iconName: z.string().min(2),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

const projectSchema = z.object({
  title: z.string().min(2),
  clientSector: z.string().min(2),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  stats: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

const teamSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  bio: z.string().min(10),
  image: z.string().min(2),
  imageAlt: z.string().optional(),
  expertise: z.array(z.string().min(2)).optional(),
  experience: z.array(z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    period: z.string().min(1),
  })).optional(),
  socials: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
  order: z.number().default(0),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});



const techSchema = z.object({
  title: z.string().min(2),
  items: z.array(z.string().min(1)),
});

const courseSchema = z.object({
  badge: z.string(),
  title: z.string().min(2),
  subtitle: z.string().min(2),
  description: z.string().min(10),
  price: z.string().min(1),
  medium: z.string().min(2),
  duration: z.string().min(1),
  syllabus: z.array(z.string().min(1)).optional(),
  instructorId: z.string().optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});


const tabs = ['services', 'projects', 'team', 'tech', 'courses', 'config', 'security'] as const;



type Tab = (typeof tabs)[number];

const initialService: Omit<IService, 'id'> = {
  title: '',
  tagline: '',
  description: '',
  capabilities: [],
  iconName: 'BrainCircuit',
  seoTitle: '',
  seoDescription: '',
};

const initialProject: Omit<IProject, 'id'> = {
  title: '',
  clientSector: '',
  challenge: '',
  solution: '',
  stats: [],
  seoTitle: '',
  seoDescription: '',
};

const initialTeam: Omit<ITeamMember, 'id'> = {
  name: '',
  role: '',
  bio: '',
  image: '',
  imageAlt: '',
  expertise: [],
  experience: [],
  socials: {
    linkedin: '',
    twitter: '',
    github: '',
  },
  order: 0,
  seoTitle: '',
  seoDescription: '',
};



const initialTech: Omit<IAITechCategory, 'id'> = {
  title: '',
  items: [],
};

const initialCourse: Omit<ICourse, 'id'> = {
  badge: '',
  title: '',
  subtitle: '',
  description: '',
  price: '',
  medium: '',
  duration: '',
  syllabus: [],
  instructorId: '',
  seoTitle: '',
  seoDescription: '',
};


export const Admin: React.FC = () => {
  const { user, isLoading: authLoading, error: authError, login, logout, changePassword } = useAdminAuth();

  const { services, projects, team, techStack, courses, siteConfig, isLoading, error, refresh } = useAdminData();

  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [teamImageFile, setTeamImageFile] = useState<File | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localTeam, setLocalTeam] = useState<ITeamMember[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);


  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editingTechId, setEditingTechId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState(initialService);
  const [projectForm, setProjectForm] = useState(initialProject);
  const [teamForm, setTeamForm] = useState(initialTeam);
  const [techForm, setTechForm] = useState(initialTech);
  const [courseForm, setCourseForm] = useState(initialCourse);
  const [configForm, setConfigForm] = useState<ISiteConfig | null>(null);

  React.useEffect(() => {
    if (siteConfig) {
      setConfigForm(siteConfig);
    }
  }, [siteConfig]);

  React.useEffect(() => {
    if (team && team.length > 0) {
      setLocalTeam(team);
    }
  }, [team]);



  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'duxaktggz';

  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? 'cognetex';

  const parseJsonSafe = async (response: Response) => {
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return { error: text };
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryUploadPreset);
    formData.append('folder', 'cognetex/team');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const payload = await parseJsonSafe(response);
    if (!response.ok) {
      const errorMessage = payload?.error?.message ?? payload?.error ?? 'Upload failed.';
      throw new Error(errorMessage);
    }
    if (!payload?.public_id) {
      throw new Error('Upload succeeded but no public ID was returned.');
    }
    return payload;
  };

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
      setTeamImageFile(null);
      setEditingTeamId(null);
      await refresh();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save team member.');
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setTeamImageFile(file);
      setCroppedImageFile(null);
      setShowCropper(true);
      setUploadError(null);
    }
  };

  const handleCropComplete = (_blob: Blob, croppedFile: File) => {
    setCroppedImageFile(croppedFile);
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setTeamImageFile(null);
    setCroppedImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadTeamImage = async () => {
    const fileToUpload = croppedImageFile || teamImageFile;
    if (!fileToUpload) {
      setUploadError('Select and crop an image before uploading.');
      return;
    }

    setUploadingImage(true);
    setUploadError(null);

    try {
      const payload = await uploadToCloudinary(fileToUpload);
      setTeamForm((prev) => ({ ...prev, image: payload.public_id }));
      setTeamImageFile(null);
      setCroppedImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      setUploadError(err instanceof Error ? err.message : 'Image upload failed. Please retry.');
    } finally {
      setUploadingImage(false);
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

  const handleSubmitCourse = async () => {
    setFormError(null);
    const parsed = courseSchema.safeParse(courseForm);
    if (!parsed.success) {
      setFormError('Please fill in all course fields correctly.');
      return;
    }
    setSaving(true);
    try {
      if (editingCourseId) {
        await updateCourse(editingCourseId, parsed.data);
      } else {
        await createCourse(parsed.data);
      }
      setCourseForm(initialCourse);
      setEditingCourseId(null);
      await refresh();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save course.');
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

        {activeTab === 'config' && (
           <div className="max-w-4xl mx-auto">
             <Card>
               <h2 className="text-xl font-bold mb-6">Site Configuration & Global SEO</h2>
               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                     <label className="text-xs font-mono text-muted uppercase tracking-wider">Hero Section</label>
                     <input
                        className="w-full bg-paper border border-border px-4 py-2 text-sm"
                        placeholder="Hero Title"
                        value={configForm?.heroTitle || ''}
                        onChange={(e) => setConfigForm(prev => prev ? { ...prev, heroTitle: e.target.value } : null)}
                     />
                     <textarea
                        className="w-full bg-paper border border-border px-4 py-2 text-sm"
                        placeholder="Hero Lead"
                        rows={3}
                        value={configForm?.heroLead || ''}
                        onChange={(e) => setConfigForm(prev => prev ? { ...prev, heroLead: e.target.value } : null)}
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-xs font-mono text-muted uppercase tracking-wider">Global SEO Defaults</label>
                     <input
                        className="w-full bg-paper border border-border px-4 py-2 text-sm"
                        placeholder="Default SEO Title"
                        value={configForm?.defaultSeoTitle || ''}
                        onChange={(e) => setConfigForm(prev => prev ? { ...prev, defaultSeoTitle: e.target.value } : null)}
                     />
                     <textarea
                        className="w-full bg-paper border border-border px-4 py-2 text-sm"
                        placeholder="Default SEO Description"
                        rows={3}
                        value={configForm?.defaultSeoDescription || ''}
                        onChange={(e) => setConfigForm(prev => prev ? { ...prev, defaultSeoDescription: e.target.value } : null)}
                     />
                   </div>
                 </div>

                 <div className="pt-6 border-t border-border space-y-4">
                   <label className="text-xs font-mono text-muted uppercase tracking-wider">Social Connectivity Links</label>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-1">
                       <span className="text-[10px] font-mono text-muted uppercase">LinkedIn</span>
                       <input
                          className="w-full bg-paper border border-border px-4 py-2 text-sm"
                          placeholder="https://linkedin.com/..."
                          value={configForm?.socials?.linkedin || ''}
                          onChange={(e) => setConfigForm(prev => prev ? { ...prev, socials: { ...prev.socials, linkedin: e.target.value } } : null)}
                       />
                     </div>
                     <div className="space-y-1">
                       <span className="text-[10px] font-mono text-muted uppercase">Twitter</span>
                       <input
                          className="w-full bg-paper border border-border px-4 py-2 text-sm"
                          placeholder="https://twitter.com/..."
                          value={configForm?.socials?.twitter || ''}
                          onChange={(e) => setConfigForm(prev => prev ? { ...prev, socials: { ...prev.socials, twitter: e.target.value } } : null)}
                       />
                     </div>
                     <div className="space-y-1">
                       <span className="text-[10px] font-mono text-muted uppercase">GitHub</span>
                       <input
                          className="w-full bg-paper border border-border px-4 py-2 text-sm"
                          placeholder="https://github.com/..."
                          value={configForm?.socials?.github || ''}
                          onChange={(e) => setConfigForm(prev => prev ? { ...prev, socials: { ...prev.socials, github: e.target.value } } : null)}
                       />
                     </div>
                   </div>
                 </div>

                 <div className="pt-6 border-t border-border">
                   <Button 
                    className="w-full md:w-auto"
                    onClick={async () => {
                      if (!configForm) return;
                      setSaving(true);
                      try {
                        await updateSiteConfig(configForm);
                        await refresh();
                        alert('Site configuration updated successfully.');
                      } catch (err) {
                        console.error(err);
                        setFormError('Failed to update configuration.');
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving}
                   >
                     Save Global Configuration
                   </Button>
                 </div>
               </div>
             </Card>
           </div>
        )}


        {(isLoading || saving) && (
          <div className="text-muted text-xs font-mono mb-4">{saving ? 'Saving...' : 'Loading data...'}</div>
        )}
        {error && <div className="text-red-600 text-xs font-mono mb-4">{error}</div>}
        {formError && <div className="text-red-600 text-xs font-mono mb-4">{formError}</div>}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingServiceId ? 'Edit Service' : 'Add Service'}</h2>
                {editingServiceId && (
                  <Button variant="outline" size="sm" onClick={() => { setEditingServiceId(null); setServiceForm(initialService); }}>Add New Instead</Button>
                )}
              </div>
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
                <SEOFormFields
                  seoTitle={serviceForm.seoTitle || ''}
                  seoDescription={serviceForm.seoDescription || ''}
                  onChange={(field, value) => setServiceForm({ ...serviceForm, [field]: value })}
                />
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
                            seoTitle: service.seoTitle || '',
                            seoDescription: service.seoDescription || '',
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          if (confirm('Delete this service?')) {
                            await deleteService(service.id);
                            refresh();
                          }
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingProjectId ? 'Edit Project' : 'Add Project'}</h2>
                {editingProjectId && (
                  <Button variant="outline" size="sm" onClick={() => { setEditingProjectId(null); setProjectForm(initialProject); }}>Add New Instead</Button>
                )}
              </div>
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
                <SEOFormFields
                  seoTitle={projectForm.seoTitle || ''}
                  seoDescription={projectForm.seoDescription || ''}
                  onChange={(field, value) => setProjectForm({ ...projectForm, [field]: value })}
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
                            seoTitle: project.seoTitle || '',
                            seoDescription: project.seoDescription || '',
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          if (confirm('Delete this project?')) {
                            await deleteProject(project.id);
                            refresh();
                          }
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
            <Card className="lg:col-span-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingTeamId ? 'Edit Team Member' : 'Add Team Member'}</h2>
                {editingTeamId && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingTeamId(null);
                      setTeamForm(initialTeam);
                      setTeamImageFile(null);
                      setCroppedImageFile(null);
                      setShowCropper(false);
                    }}
                  >
                    Add New Instead
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Name"
                    value={teamForm.name}
                    onChange={(event) => setTeamForm({ ...teamForm, name: event.target.value })}
                  />
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Role"
                    value={teamForm.role}
                    onChange={(event) => setTeamForm({ ...teamForm, role: event.target.value })}
                  />
                  <textarea
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    rows={4}
                    placeholder="Short Bio"
                    value={teamForm.bio}
                    onChange={(event) => setTeamForm({ ...teamForm, bio: event.target.value })}
                  />
                  
                  <div className="space-y-4 pt-4 border-t border-border">
                    <label className="text-xs font-mono text-muted uppercase tracking-widest">Expertise</label>
                    <input
                      className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                      placeholder="Expertise (e.g. AI Architecture, NLP - comma separated)"
                      value={teamForm.expertise?.join(', ') || ''}
                      onChange={(e) => setTeamForm({
                        ...teamForm,
                        expertise: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <label className="text-xs font-mono text-muted uppercase tracking-widest">Social Links</label>
                    <input
                      className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                      placeholder="LinkedIn URL"
                      value={teamForm.socials?.linkedin || ''}
                      onChange={(e) => setTeamForm({
                        ...teamForm,
                        socials: { ...(teamForm.socials || {}), linkedin: e.target.value }
                      })}
                    />
                    <input
                      className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                      placeholder="Github URL"
                      value={teamForm.socials?.github || ''}
                      onChange={(e) => setTeamForm({
                        ...teamForm,
                        socials: { ...(teamForm.socials || {}), github: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted uppercase tracking-widest">Display Order (lower numbers appear first)</label>
                    <input
                      type="number"
                      className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                      placeholder="0"
                      value={teamForm.order}
                      onChange={(e) => setTeamForm({ ...teamForm, order: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                </div>


                <div className="space-y-4">
                  <div className="space-y-4">
                    <label className="text-xs font-mono text-muted uppercase tracking-widest">Career History</label>
                    <textarea
                      className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                      rows={5}
                      placeholder="Experience (Format: Role at Company | Period per line, e.g. CEO at Cognetex | 2022 - Present)"
                      value={teamForm.experience?.map(e => `${e.role} at ${e.company} | ${e.period}`).join('\n') || ''}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n').filter(Boolean);
                        const experience = lines.map(line => {
                          const [roleAndCompany, period] = line.split('|').map(s => s.trim());
                          const [role, company] = (roleAndCompany || '').split(' at ').map(s => s.trim());
                          return { role: role || '', company: company || '', period: period || '' };
                        });
                        setTeamForm({ ...teamForm, experience });
                      }}
                    />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <label className="text-xs font-mono text-muted uppercase tracking-widest">Profile Image</label>
                    <div className="flex flex-col gap-4 mt-2">
                       {teamForm.image && (
                         <CloudinaryImage 
                            publicId={teamForm.image} 
                            alt={teamForm.name} 
                            className="w-24 h-24 object-cover border border-border"
                          />
                       )}
                        <div className="flex gap-2">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                            {uploadingImage ? 'Uploading...' : 'Upload Image'}
                          </Button>
                          {(teamImageFile || croppedImageFile) && (
                            <Button size="sm" onClick={handleUploadTeamImage} disabled={uploadingImage}>
                              Confirm Upload
                            </Button>
                          )}
                        </div>
                    </div>
                  </div>

                  <SEOFormFields
                    seoTitle={teamForm.seoTitle || ''}
                    seoDescription={teamForm.seoDescription || ''}
                    onChange={(field, value) => setTeamForm({ ...teamForm, [field]: value })}
                  />
                  
                  <div className="pt-6">
                    <Button fullWidth onClick={handleSubmitTeam}>
                      {editingTeamId ? 'Update Team Member' : 'Add Team Member'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="lg:col-span-12 space-y-2 mt-8">
              <div className="flex items-center gap-4 px-6 py-2 text-[10px] font-mono text-muted uppercase tracking-widest border-b border-border mb-2">
                <div className="w-8"></div>
                <div className="w-12">Rank</div>
                <div className="w-12">Photo</div>
                <div className="flex-grow">Name & Role</div>
                <div className="w-48 text-right">Actions</div>
              </div>

              {localTeam.length !== team.length && (
                 <div className="flex justify-center p-4">
                    <Button onClick={() => setLocalTeam(team)}>Reset to Saved Order</Button>
                 </div>
              )}

              <Reorder.Group axis="y" values={localTeam} onReorder={setLocalTeam} className="space-y-2">
                {localTeam.map((member, index) => (
                  <Reorder.Item 
                    key={member.id} 
                    value={member}
                    className="cursor-default"
                  >
                    <Card noPadding className={`flex flex-col ${editingTeamId === member.id ? 'border-signal ring-1 ring-signal' : ''}`}>
                      <div className="flex items-center gap-4 p-4">
                        <div className="w-8 cursor-grab active:cursor-grabbing text-muted hover:text-signal transition-colors">
                          <GripVertical size={20} />
                        </div>
                        <div className="w-12 flex flex-col items-center justify-center border-l border-border pl-4">
                          <span className="text-xl font-bold font-mono text-signal">#{index}</span>
                          <span className="text-[8px] text-muted uppercase font-mono">Rank_UI</span>
                        </div>
                        <div className="w-12 h-12 border border-border overflow-hidden bg-paper ml-2">
                          <CloudinaryImage 
                            publicId={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-bold uppercase tracking-tight">{member.name}</h3>
                          <p className="text-[10px] text-signal font-mono uppercase">{member.role}</p>
                        </div>
                        <div className="w-48 flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingTeamId(member.id);
                              setTeamForm({
                                ...member,
                                imageAlt: member.imageAlt || '',
                                expertise: member.expertise || [],
                                experience: member.experience || [],
                                socials: {
                                  linkedin: member.socials?.linkedin || '',
                                  twitter: member.socials?.twitter || '',
                                  github: member.socials?.github || '',
                                },
                              });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              if (confirm('Delete this team member?')) {
                                await deleteTeamMember(member.id);
                                refresh();
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              {localTeam.length > 0 && (
                <div className="pt-8 flex justify-center">
                   <Button 
                    variant="outline" 
                    className="border-signal text-signal hover:bg-signal hover:text-background"
                    onClick={async () => {
                      setSaving(true);
                      try {
                        await reorderTeam(localTeam);
                        await refresh();
                        alert('Team order persisted successfully.');
                      } catch (err) {
                        console.error(err);
                        setFormError('Failed to persist order.');
                      } finally {
                        setSaving(false);
                      }
                    }}
                   >
                     Persist New Order to Cloud
                   </Button>
                </div>
              )}
            </div>


          </div>
        )}


        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingTechId ? 'Edit Category' : 'Add Category'}</h2>
                {editingTechId && (
                  <Button variant="outline" size="sm" onClick={() => { setEditingTechId(null); setTechForm(initialTech); }}>Add New Instead</Button>
                )}
              </div>
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
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          if (confirm('Delete this tech category?')) {
                            await deleteTechCategory(category.id);
                            refresh();
                          }
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

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingCourseId ? 'Edit Course' : 'Add Course'}</h2>
                {editingCourseId && (
                  <Button variant="outline" size="sm" onClick={() => { setEditingCourseId(null); setCourseForm(initialCourse); }}>Add New Instead</Button>
                )}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Badge"
                    value={courseForm.badge}
                    onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                  />
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Title"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Price"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                  />
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Medium"
                    value={courseForm.medium}
                    onChange={(e) => setCourseForm({ ...courseForm, medium: e.target.value })}
                  />
                  <input
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="Duration"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                  />
                </div>
                <input
                  className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                  placeholder="Subtitle"
                  value={courseForm.subtitle}
                  onChange={(e) => setCourseForm({ ...courseForm, subtitle: e.target.value })}
                />
                <textarea
                  className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                  rows={4}
                  placeholder="Description"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-muted uppercase tracking-widest">Syllabus Modules (one per line)</label>
                  <textarea
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    rows={5}
                    placeholder="Foundations of AI..."
                    value={courseForm.syllabus?.join('\n') || ''}
                    onChange={(e) => setCourseForm({
                      ...courseForm,
                      syllabus: e.target.value.split('\n').filter(line => line.trim() !== '')
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-muted uppercase tracking-widest">Instructor</label>
                  <select
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    value={courseForm.instructorId}
                    onChange={(e) => setCourseForm({ ...courseForm, instructorId: e.target.value })}
                  >
                    <option value="">Select Instructor</option>
                    {team.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <SEOFormFields
                  seoTitle={courseForm.seoTitle || ''}
                  seoDescription={courseForm.seoDescription || ''}
                  onChange={(field, value) => setCourseForm({ ...courseForm, [field]: value })}
                />
                <Button onClick={handleSubmitCourse} className="w-full">
                  {editingCourseId ? 'Update Course' : 'Add Course'}
                </Button>
              </div>

            </Card>
            <div className="lg:col-span-7 space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className={`${editingCourseId === course.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{course.title}</h3>
                        {course.badge && <span className="text-[10px] font-mono border border-border px-1 px-1 bg-background">{course.badge}</span>}
                      </div>
                      <p className="text-xs text-signal font-mono">{course.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCourseId(course.id);
                          setCourseForm({
                            badge: course.badge || '',
                            title: course.title,
                            subtitle: course.subtitle,
                            description: course.description,
                            price: course.price,
                            medium: course.medium,
                            duration: course.duration,
                            syllabus: course.syllabus || [],
                            instructorId: course.instructorId || '',
                            seoTitle: course.seoTitle || '',
                            seoDescription: course.seoDescription || '',
                          });

                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          if (confirm('Delete this course?')) {
                            await deleteCourse(course.id);
                            refresh();
                          }
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
        {activeTab === 'security' && (

          <div className="max-w-md mx-auto">
            <Card>
              <h2 className="text-xl font-bold mb-6 flex items-center justify-between font-mono">
                ACCOUNT_SECURITY
                <div className="w-2 h-2 bg-signal animate-pulse" />
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-muted uppercase tracking-widest mb-2 block">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted uppercase tracking-widest mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full bg-paper border border-border px-4 py-2 text-sm font-mono"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button 
                  fullWidth 
                  onClick={async () => {
                    if (!newPassword) {
                      alert('Password cannot be empty.');
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      alert('Passwords do not match.');
                      return;
                    }
                    if (newPassword.length < 6) {
                      alert('Password must be at least 6 characters.');
                      return;
                    }
                    
                    setSaving(true);
                    try {
                      await changePassword(newPassword);
                      alert('Password updated successfully.');
                      setNewPassword('');
                      setConfirmPassword('');
                    } catch (err) {
                      console.error(err);
                      alert('Failed to update password. You may need to re-log and try again.');
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                >
                  {saving ? 'UPDATING...' : 'UPDATE ACCESS KEY'}
                </Button>
                <div className="pt-4 border-t border-border mt-4">
                   <p className="text-[10px] font-mono text-muted leading-tight uppercase">
                     Note: For security reasons, if you haven't logged in recently, you may be prompted to re-authenticate before changing your password.
                   </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

