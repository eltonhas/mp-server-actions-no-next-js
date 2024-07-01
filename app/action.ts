/* eslint-disable camelcase */
'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  customer_name: z.string().min(1, { message: 'Insira um nome.' }),
  customer_email: z.string().email({ message: 'Insira um email válido.' }),
  status: z.union([z.literal('pending'), z.literal('completed')]),
  order_date: z.string(),
  amount_in_cents: z
    .string()
    .min(1, { message: 'Insira um valor.' })
    .transform((value) => Number(value) * 100),
})

const deleteFormSchema = z.object({
  orderId: z.string(),
})

export async function createOrderAction(data: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { customer_name, customer_email, order_date, amount_in_cents, status } =
    result.data

  try {
    await fetch('https://apis.codante.io/api/orders-api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_name,
        customer_email,
        order_date,
        amount_in_cents,
        status,
      }),
    })
  } catch (err) {
    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  revalidatePath('/', 'page')
  return {
    success: true,
    message: 'Sucesso, nova ordem cadastrada.',
    errors: null,
  }
}

export async function deleteOrderAction(data: FormData) {
  const result = deleteFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { orderId } = result.data

  try {
    await fetch(`https://apis.codante.io/api/orders-api/orders/${orderId}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  revalidatePath('/', 'page')
  return {
    success: true,
    message: 'Sucesso, ordem deletada.',
    errors: null,
  }
}
