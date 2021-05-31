import React from "react";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from "./styles";

import profile from "../../assets/me.jpg";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionData,
} from "../../components/TransactionCard";

export interface DataListProps extends TransactionData {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      title: "Desenvolvimento de Site",
      amount: "R$ 8.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2021",
      type: "positive",
    },
    {
      id: "2",
      title: "Geladeira",
      amount: "R$ 1.000,00",
      category: { name: "Geladeira", icon: "shopping-bag" },
      date: "15/04/2021",
      type: "negative",
    },
    {
      id: "3",
      title: "Desenvolvimento de Aplicativo",
      amount: "R$ 18.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2021",
      type: "positive",
    },
    {
      id: "4",
      title: "Almoço",
      amount: "R$ 450",
      category: { name: "Alimentação", icon: "coffee" },
      date: "11/04/2021",
      type: "negative",
    },
    {
      id: "5",
      title: "Moradia",
      amount: "R$ 2.000,00",
      category: { name: "Aluguel", icon: "home" },
      date: "15/04/2021",
      type: "negative",
    },
    {
      id: "6",
      title: "Venda MacBook",
      amount: "R$ 5.000,00",
      category: { name: "Notebook", icon: "shopping-bag" },
      date: "21/04/2021",
      type: "positive",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={profile} />

            <User>
              <UserGreeting>Olá ,</UserGreeting>
              <UserName>Paulo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
             <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entrada"
          amount="R$ 10.000,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saída"
          amount="R$ 1.000,00"
          lastTransaction="Última entrada dia 15 de abril"
          type="down"
        />
        <HighlightCard
          title="Entrada"
          amount="R$ 4.000,00"
          lastTransaction="Última entrada dia 12 de abril"
          type="up"
        />
        <HighlightCard
          title="Total"
          amount="R$ 600,00"
          lastTransaction="Última entrada dia 15 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
