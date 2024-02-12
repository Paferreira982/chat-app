'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext, SignInDataDto } from "@/contexts/AuthContext";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { ToasterToast, useToast } from "@/components/ui/use-toast";
import RegisterUserDialog from "@/components/dialog/registerUserDialog";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // TODO: Lidar com duplicação.
  function handleToast({variant, title, description}: Omit<ToasterToast, "id">) {
    toast({
      variant,
      title,
      description,
    });
  }

  async function handleSignIn (data: unknown){
    try {
      const {email, password} = data as SignInDataDto;
      await signIn({ email, password });

    } catch (error) {
      const err = error as Error;
      let props: Omit<ToasterToast, "id"> = {}

      if (err.message === 'UNAUTHORIZED') {
        props.variant = "default";
        props.title = "Credenciais inválidas";
        props.description = "Verifique seu e-mail e senha e tente novamente.";
      }

      if (Object.keys(props).length === 0) {
        props.variant = "destructive";
        props.title = "Falha na comunicação com o servidor.";
        props.description = "Verifique sua conexão com a internet e tente novamente.";
      }

      handleToast(props);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">

      <Card className="w-auto min-w-[550px] max-w-[1200px] p-8">
        <CardHeader>
            <CardTitle>Acesse sua conta</CardTitle>
            <CardDescription>Insira suas credencias para fazer login</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(handleSignIn)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Label htmlFor="email">
                    <MailIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10" />
                  </Label>
                  <Input 
                    {...register('email', { required: true })}
                    type="email" 
                    id="email" 
                    placeholder="usuario@provedor.com" 
                    className="pl-8 pb-3" />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Label htmlFor="password">
                      <LockIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10" />
                    </Label>
                    <Input 
                      {...register('password', { required: true })}
                      type={showPassword ? 'text' : 'password'} 
                      id="password" 
                      placeholder="Insira sua senha" 
                      className="pl-8 pb-3" />
                    {showPassword 
                      ? <EyeIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10 cursor-pointer" onClick={() => setShowPassword((prev: boolean) => !prev)} /> 
                      : <EyeOffIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10 cursor-pointer" onClick={() => setShowPassword((prev: boolean) => !prev)} />}
                  </div>
              </div>
            </div>

            <div className="items-top flex space-x-2 mt-4">
              <Checkbox 
                {...register('remainLogged')}
                id="perm-conected" />

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="perm-conected"
                  className="text-sm font-small leading-none"
                >
                  Continuar conectado
                </label>
              </div>

            </div>
          </CardContent>
        
          <CardFooter className="grid w-full items-center gap-4 pb-0">
            <Button className="flex justify-center" variant="default" type="submit">
              Acessar
              <ArrowRightIcon className="ml-3 opacity-80 size-5" />
            </Button>

            <Button className="flex justify-center bottom-0" variant="link" type="button" onClick={() => setOpenDialog(true)}>
              Criar uma nova conta
            </Button>
          </CardFooter>
        </form>
      </Card>
      <RegisterUserDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </main>
  );
}
