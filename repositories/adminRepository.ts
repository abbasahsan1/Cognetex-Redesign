import { addDoc, collection, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';
import { IAITechCategory, IProject, IService, ITeamMember, ICourse, ISiteConfig, IApproachItem, IAISolutionPillar, IAIService, ITrustLogo, ICareerRole, ICareerBenefit, ICareerStep } from '../types';


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

export const createApproachItem = async (payload: Omit<IApproachItem, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'uniqueApproach'), payload);
};

export const updateApproachItem = async (id: string, payload: Partial<IApproachItem>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'uniqueApproach', id), payload);
};

export const deleteApproachItem = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'uniqueApproach', id));
};

export const createSolutionPillar = async (payload: Omit<IAISolutionPillar, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'aiSolutionPillars'), payload);
};

export const updateSolutionPillar = async (id: string, payload: Partial<IAISolutionPillar>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'aiSolutionPillars', id), payload);
};

export const deleteSolutionPillar = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'aiSolutionPillars', id));
};

export const createAIServiceItem = async (payload: Omit<IAIService, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'aiServices'), payload);
};

export const updateAIServiceItem = async (id: string, payload: Partial<IAIService>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'aiServices', id), payload);
};

export const deleteAIServiceItem = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'aiServices', id));
};

export const createTrustLogo = async (payload: Omit<ITrustLogo, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'trustLogos'), payload);
};

export const updateTrustLogo = async (id: string, payload: Partial<ITrustLogo>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'trustLogos', id), payload);
};

export const deleteTrustLogo = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'trustLogos', id));
};

export const createCareerRole = async (payload: Omit<ICareerRole, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'careers'), payload);
};

export const updateCareerRole = async (id: string, payload: Partial<ICareerRole>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'careers', id), payload);
};

export const deleteCareerRole = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'careers', id));
};

export const createCareerBenefit = async (payload: Omit<ICareerBenefit, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'careerBenefits'), payload);
};

export const updateCareerBenefit = async (id: string, payload: Partial<ICareerBenefit>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'careerBenefits', id), payload);
};

export const deleteCareerBenefit = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'careerBenefits', id));
};

export const createCareerStep = async (payload: Omit<ICareerStep, 'id'>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return addDoc(collection(db, 'careerSteps'), payload);
};

export const updateCareerStep = async (id: string, payload: Partial<ICareerStep>) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return updateDoc(doc(db, 'careerSteps', id), payload);
};

export const deleteCareerStep = async (id: string) => {
  if (!firebaseEnabled || !db) throw new Error('Firebase not configured.');
  return deleteDoc(doc(db, 'careerSteps', id));
};

