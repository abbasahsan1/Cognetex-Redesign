import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'node:fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ensureEnv = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary server credentials.');
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
};

const parseForm = async (req: any) => {
  const form = formidable({ multiples: false });
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    res.status(200).json({ ok: true });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    ensureEnv();
    const { fields, files } = await parseForm(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !('filepath' in file)) {
      res.status(400).json({ error: 'Missing image file.' });
      return;
    }

    const folder = typeof fields.folder === 'string' ? fields.folder : 'cognetex/team';

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder,
      resource_type: 'image',
    });

    await fs.unlink(file.filepath).catch(() => undefined);

    res.status(200).json({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: error?.message ?? 'Upload failed.' });
  }
}
