
"use client";

// Utils
import { cn } from "@/lib/utils";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

// Form libs
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Componente de formulario de login reutilizable.
 *
 * @param {Object} props - Props del componente LoginForm.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor principal.
 * @param {Object} [props.config] - Configuración del formulario (campos, título, descripción).
 * @param {string} [props.config.title] - Título del formulario.
 * @param {string} [props.config.description] - Descripción del formulario.
 * @param {Array<Object>} [props.config.fields] - Lista de campos a renderizar. Cada campo debe tener:
 *   @param {string} props.config.fields[].id - Identificador único del campo.
 *   @param {string} props.config.fields[].label - Etiqueta del campo.
 *   @param {string} props.config.fields[].type - Tipo de input ("text", "password", etc).
 *   @param {string} [props.config.fields[].placeholder] - Placeholder del input.
 * @param {function} onSubmit - Función que se ejecuta al enviar el formulario. Recibe los datos validados.
 * @param {import('zod').ZodType} schema - Esquema de validación Zod para el formulario.
 * @returns {JSX.Element} El formulario de login renderizado.
 */

export function LoginForm({
  className,
  config = {},
  schema,
  onSubmit,
  ...props
}) {
  const { title, description, fields = [] } = config;

  // Definir valores iniciales para todos los campos
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col gap-6">
                {fields.map((field) => (
                  <FormField
                    key={field.id}
                    name={field.id}
                    control={methods.control}
                    render={({ field: rhfField }) => (
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete={field.type === "password" ? "current-password" : field.type}
                            {...rhfField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={methods.formState.isSubmitting}
                  >
                    {methods.formState.isSubmitting ? "Enviando..." : "Entrar"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
