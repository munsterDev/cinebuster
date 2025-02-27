import { FaCircleChevronRight } from "react-icons/fa6";
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from '@/modules/UserButton.module.css';
import { Session } from "next-auth";
import SignInForm from "./SignInForm";

export function UserButton({session} : {session : Session}) {

  if (!session) return (<SignInForm session={session}/>)
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src={session?.user?.image!}
          radius="xl"
        />

        <div style={{ flex: 1 }} className="">
          <Text size="sm" fw={500}>
            {session?.user?.name!}
          </Text>

          <Text c="dimmed" size="xs">
            {session?.user?.email!}
          </Text>
        </div>

        <FaCircleChevronRight size={14} />
      </Group>
    </UnstyledButton>
  );
}