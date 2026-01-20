import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';
import { IAITechCategory, IProject, IService, ITeamMember } from '../types';

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
