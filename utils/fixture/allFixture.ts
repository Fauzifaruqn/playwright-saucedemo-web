import { mergeTests } from '@playwright/test';
import { test as loginFixture } from './loginFixture';
import {test as productFixure} from './productFixture';
import {test as cartFixture} from './cartFixture';
import {test as componentFixture} from './componentFixture'
import {test as checkoutFixture} from './checkoutFicture'

export const test = mergeTests(
    loginFixture,
    productFixure,
    cartFixture,
    componentFixture,
    checkoutFixture
);
