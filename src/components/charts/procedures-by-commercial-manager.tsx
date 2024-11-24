import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function ProceduresByCommercialManager() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pedro Ferreira</p>
          <p className="text-sm text-muted-foreground">pferreira@az.cl</p>
        </div>
        <div className="ml-auto font-medium">+1000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>YG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Yelitza García</p>
          <p className="text-sm text-muted-foreground">ygarcia@az.cl</p>
        </div>
        <div className="ml-auto font-medium">+999</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>PA</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pía Arias</p>
          <p className="text-sm text-muted-foreground">parias@az.cl</p>
        </div>
        <div className="ml-auto font-medium">+998</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Cristina Gamper</p>
          <p className="text-sm text-muted-foreground">cgamper@az.cl</p>
        </div>
        <div className="ml-auto font-medium">+997</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>EG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Elisabeth Galvez</p>
          <p className="text-sm text-muted-foreground">egalvez@az.cl</p>
        </div>
        <div className="ml-auto font-medium">+996</div>
      </div>
    </div>
  )
}

export default function ShortTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>Deudor</TableHead>
          <TableHead className="hidden md:table-cell">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-l-4 border-transparent hover:border-primary">
          <TableCell className="font-medium">1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground">
            $50,000
          </TableCell>
        </TableRow>
        <TableRow className="border-l-4 border-transparent hover:border-primary">
          <TableCell className="font-medium">2</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground">
            $35,000
          </TableCell>
        </TableRow>
        <TableRow className="border-l-4 border-transparent hover:border-primary">
          <TableCell className="font-medium">3</TableCell>
          <TableCell>Bob Johnson</TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground">
            $25,000
          </TableCell>
        </TableRow>
        <TableRow className="border-l-4 border-transparent hover:border-primary">
          <TableCell className="font-medium">4</TableCell>
          <TableCell>Alice Williams</TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground">
            $20,000
          </TableCell>
        </TableRow>
        <TableRow className="border-l-4 border-transparent hover:border-primary">
          <TableCell className="font-medium">5</TableCell>
          <TableCell>Tom Davis</TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground">
            $15,000
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
