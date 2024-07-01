/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Loader2, Trash } from 'lucide-react'
import type { FormEvent } from 'react'
import toast from 'react-hot-toast'

import { deleteOrderAction } from '@/app/action'
import { useFormState } from '@/hooks/use-form-state'

import { Button } from './ui/button'

interface DeleteButtonProps {
  orderId: number
}

export default function DeleteButton({ orderId }: DeleteButtonProps) {
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(deleteOrderAction)

  async function handleOnDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    handleSubmit(data)
  }

  return (
    <form onSubmit={handleOnDelete}>
      {success === true && message && toast.success(message)}
      <input type="hidden" name="orderId" id="orderId" value={orderId} />
      <Button variant="ghost" className="" type="submit">
        {isPending ? (
          <Loader2 className="size-4 animate-spin text-red-500" />
        ) : (
          <Trash className="w-4 text-red-500" />
        )}
      </Button>
    </form>
  )
}
