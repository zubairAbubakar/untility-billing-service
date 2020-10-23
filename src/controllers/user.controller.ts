import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'


/**
 * Get Users End Point 
 * @param req 
 * @param res 
 */
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    return res.json(user);
};

/**
 * Get Users End Point 
 * @param req 
 * @param res 
 */
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
};


/**
 * Create User Endpoint 
 * @param req 
 * @param res 
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.json(results);
};


/**
 * Update User Endpoint 
 * @param req 
 * @param res 
 */
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }
    
    return res.status(404).json({message: 'User not found'});
};