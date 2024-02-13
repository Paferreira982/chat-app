import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { ToasterToast, toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import avatarService from "@/services/avatar.service";

export default function RegisterUserDialog({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: (open: boolean) => void }) {
    const { register, handleSubmit } = useForm();
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // TODO: lidar com duplicação
    function handleToast({variant, title, description}: Omit<ToasterToast, "id">) {
        toast({
          variant,
          title,
          description,
        });
    }

    // TODO: Corrigir any
    async function handleRegisterUser (data: any) {
      let props: Omit<ToasterToast, "id"> = {}

      try {
        if (data.password !== data.confirmPassword) {
          props.variant = "default";
          props.title = "As senhas não conferem";
          props.description = "As senhas inseridas não conferem. Tente novamente.";
          return handleToast(props);
        }

        data.profileImage = avatarService.generateAvatar(data.email);

        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status === 400) {
          const body = await response.json();
          console.log(body);
          props.variant = "default";
          props.title = "Falha ao criar a conta";
          props.description = body.message;
        }

        if (Object.keys(props).length === 0 && response.status === 500) {
          props.variant = "destructive";
          props.title = "Falha na comunicação com o servidor.";
          props.description = "Verifique sua conexão com a internet e tente novamente.";
        }

        if (Object.keys(props).length === 0) {
          props.variant = "default";
          props.title = "Conta criada com sucesso";
          props.description = "Agora você já pode acessar sua conta.";
          setOpenDialog(false);
        }

        handleToast(props);

      } catch (error) {
        const err = error as Error;
        console.log(err);
      }
    }
    
    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className="w-full">
          <form onSubmit={handleSubmit(handleRegisterUser)}>
            <DialogHeader>
              <DialogTitle>Crie uma conta</DialogTitle>
              <DialogDescription>
                Insira seus dados no formulário abaixo para criar uma nova conta.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">

              <div className="grid w-full items-center gap-4">

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nome</Label>
                  <div className="relative">
                    <Label htmlFor="name">
                      <UserIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10" />
                    </Label>
                    <Input 
                      {...register('name', { required: true })}
                      type="text" 
                      id="name"
                      autoComplete="name"
                      placeholder="Insira seu nome" 
                      className="pl-8 pb-3" />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">E-mail</Label>
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
                        {...register('password', { required: true, minLength: 6, maxLength: 20 })}
                        type={showRegisterPassword ? 'text' : 'password'} 
                        id="password" 
                        placeholder="Digite sua senha" 
                        className="pl-8 pb-3" />
                      {showRegisterPassword 
                        ? <EyeIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10 cursor-pointer" onClick={() => setShowRegisterPassword((prev: boolean) => !prev)} /> 
                        : <EyeOffIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10 cursor-pointer" onClick={() => setShowRegisterPassword((prev: boolean) => !prev)} />}
                  </div>
              </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirme a sua senha</Label>
                    <div className="relative">
                      <Label htmlFor="confirmPassword">
                        <LockIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10" />
                      </Label>
                      <Input 
                        {...register('confirmPassword', { required: true })}
                        type={showConfirmPassword ? 'text' : 'password'} 
                        id="confirmPassword" 
                        placeholder="Confirme sua senha" 
                        className="pl-8 pb-3" />
                      {showConfirmPassword 
                        ? <EyeIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10 cursor-pointer" onClick={() => setShowConfirmPassword((prev: boolean) => !prev)} /> 
                        : <EyeOffIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform z-10 cursor-pointer" onClick={() => setShowConfirmPassword((prev: boolean) => !prev)} />}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Cadastrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}