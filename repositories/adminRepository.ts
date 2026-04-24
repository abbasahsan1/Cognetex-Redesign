import { addDoc, collection, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';
import { IAITechCategory, IProject, IService, ITeamMember, ICourse, ISiteConfig } from '../types';


export const createService = async (payload: Omit<IService, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'services'), payload);
};

export const updateService = async (id: string, payload: Partial<IService>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'services', id), payload);
};

export const deleteService = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'services', id));
};

export const createProject = async (payload: Omit<IProject, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'projects'), payload);
};

export const updateProject = async (id: string, payload: Partial<IProject>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'projects', id), payload);
};

export const deleteProject = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'projects', id));
};

export const createTeamMember = async (payload: Omit<ITeamMember, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'team'), payload);
};

export const updateTeamMember = async (id: string, payload: Partial<ITeamMember>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'team', id), payload);
};

export const deleteTeamMember = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'team', id));
};

export const reorderTeam = async (members: ITeamMember[]) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  const { writeBatch } = await import('firebase/firestore');
  const batch = writeBatch(db);
  
  members.forEach((member, index) => {
    const ref = doc(db, 'team', member.id);
    batch.update(ref, { order: index });
  });
  
  return batch.commit();
};


export const createTechCategory = async (payload: Omit<IAITechCategory, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'techStack'), payload);
};

export const updateTechCategory = async (id: string, payload: Partial<IAITechCategory>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'techStack', id), payload);
};

export const deleteTechCategory = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'techStack', id));
};

export const createCourse = async (payload: Omit<ICourse, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'courses'), payload);
};

export const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'courses', id), payload);
};

export const deleteCourse = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'courses', id));
};

export const updateSiteConfig = async (payload: ISiteConfig) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return setDoc(doc(db, 'config', 'site'), payload);
};

