import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@vigneshsarathy/shared';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const { email, username } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, username });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
