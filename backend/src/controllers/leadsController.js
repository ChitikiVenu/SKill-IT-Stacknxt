import { asyncHandler } from '../middleware/errorHandler.js';
import { validateLeadPayload } from '../middleware/validate.js';
import { createLead } from '../services/leadsService.js';

export const postLead = asyncHandler(async (req, res) => {
  const payload = validateLeadPayload(req.body ?? {});
  const lead = await createLead(payload);
  res.status(201).json({ data: lead });
});
