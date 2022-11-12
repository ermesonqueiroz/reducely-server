import { Request, Response, Router } from 'express';

const router = Router();

router.route('/link')
  .get((req: Request, res: Response) => res.json({ ok: true }));

export default router;
