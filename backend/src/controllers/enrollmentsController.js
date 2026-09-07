import { asyncHandler } from '../middleware/errorHandler.js';
import { validateEnrollmentPayload } from '../middleware/validate.js';
import { createEnrollment } from '../services/enrollmentsService.js';

export const postEnrollment = asyncHandler(async (req, res) => {
  const payload = validateEnrollmentPayload(req.body ?? {});
  const enrollment = await createEnrollment(payload);
  res.status(201).json({ data: enrollment });
});
