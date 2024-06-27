'use client'

import { Trash } from 'lucide-react'

import { Button } from './ui/button'

export default function DeleteButton() {
  return (
    <form>
      <input type="hidden" name="orderId" />
      <Button variant="ghost" className="">
        <Trash className="w-4 text-red-500" />
      </Button>
    </form>
  )
}
