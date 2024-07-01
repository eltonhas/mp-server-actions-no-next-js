'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { type FormEvent, useState } from 'react'

import { createOrderAction } from '@/app/action'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Input } from './ui/input'
import { Label } from './ui/label'

export default function OrderForm() {
  const [date, setDate] = useState<Date | undefined>()
  const [errorDate, setErrorDate] = useState('')
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(createOrderAction)

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    if (date === undefined || null) {
      return setErrorDate('Preencha a data')
    }

    setErrorDate('')

    const dateFormated = `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`

    data.append('order_date', dateFormated)

    handleSubmit(data)
  }

  return (
    <form onSubmit={handleOnSubmit} className="grid items-start gap-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Criação de ordem falhou!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="customer_name">Nome do Cliente</Label>
        <Input
          name="customer_name"
          id="customer_name"
          placeholder="José Carlos da Silva"
        />
        {errors?.customer_name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.customer_name[0]}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customer_email">Email do Cliente</Label>
        <Input
          name="customer_email"
          type="email"
          id="customer_email"
          placeholder="jose@example.com"
        />
        {errors?.customer_name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.customer_name[0]}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status">
          <SelectTrigger className="">
            <SelectValue placeholder="Pendente | Completo" />
          </SelectTrigger>
          <SelectContent id="status">
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="completed">Completo</SelectItem>
          </SelectContent>
        </Select>
        {errors?.customer_name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.customer_name[0]}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Data do Pedido</Label>
        <DatePicker onSelect={setDate} />
        {errorDate.length > 0 && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errorDate}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount_in_cents">Valor do Pedido</Label>
        <Input
          name="amount_in_cents"
          id="amount_in_cents"
          placeholder="100,00"
        />
        {errors?.customer_name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.customer_name[0]}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Cadastrar'}
      </Button>
    </form>
  )
}
