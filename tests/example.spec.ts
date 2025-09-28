import { ProductObject } from '@/app/types/ProductObject';
import { test, expect } from '@playwright/test';

test('product title visibility', async ({ page }) => {
  const products : Array<ProductObject> = (await (await fetch("http://localhost:3000/api/products")).json())["products"];

  await page.goto('http://localhost:3000/products/1');

  await expect(page.getByText(products[0].title, {exact: true})).toBeVisible();
});

test('search iphone item available', async ({ page }) => {
  await page.goto('/');

  const products : Array<ProductObject> = (await (await fetch("http://localhost:3000/api/products")).json())["products"];

  const findProduct = products.find((product) => product.title.startsWith('iPhone'));

  await page.getByRole('textbox', {name: 'Search item here'}).fill(findProduct!.title);

  const product = page.getByRole('listitem').filter({hasText: findProduct!.title});

  await page.getByRole('textbox', {name: 'Search item here'}).focus();

  await expect(product).toBeVisible({ timeout: 10000 });
  
});

test('iphone product page available', async ( { page }) => {
  await page.goto('/');

  const products : Array<ProductObject> = (await (await fetch("http://localhost:3000/api/products")).json())["products"];

  const findProduct = products.find((product) => product.title.startsWith('iPhone'));

  await page.goto(`/products/${findProduct!.id}`);

  await expect(page.getByText(findProduct!.title, {exact: true})).toBeVisible();
});

test('iphone product in cart', async ({ page }) => {
  await page.goto('/');

  const products : Array<ProductObject> = (await (await fetch("http://localhost:3000/api/products")).json())["products"];

  const findProduct = products.find((product) => product.title.startsWith('iPhone'));

  await page.goto(`/products/${findProduct!.id}`);

  await page.getByRole('button', {name: 'Add to Cart'}).click();

  await page.goto('/cart');
  
  await expect(page.getByText(findProduct!.title, {exact: true})).toBeVisible();
});
