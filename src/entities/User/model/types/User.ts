import { UserRole } from '../consts/userConsts';
import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
import {JsonSettings} from './jsonSettings';

export interface User {
    id: string;
    name: string;
    avatar?: string;
    token?: string;
    created_at?: string;
    updated_at?: string;

    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;

}

export interface UserSchema {
    authData?: User;

    _initial: boolean;
}
