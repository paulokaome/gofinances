import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import Asyncstorage from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"
import { useNavigation } from "@react-navigation/native"

import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("o valor não pode ser negativo"),
});

export function Register() {
  const [trasactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const dataKey = "@gofinances:transactions";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypesSelected(type: "positive" | "negative") {
    setTransactionType(type);
  }
  function handleOpenModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseModal() {
    setCategoryModalOpen(false);
  }
  async function handleRegister(form: FormData) {
    if (!trasactionType) {
      return Alert.alert("Selecione o tipo de transação");
    }
    if (category.key === "category") {
      return Alert.alert("Seleciona a categoria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type:trasactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const data = await Asyncstorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [
        ...currentData,
        newTransaction
      ]

      await Asyncstorage.setItem(dataKey, JSON.stringify(dataFormated));

      reset()
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      })
      navigation.navigate("Listagem")

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar")

    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                onPress={() => handleTransactionTypesSelected("positive")}
                title="Income"
                type="up"
                isActive={trasactionType === "positive"}
              />
              <TransactionTypeButton
                onPress={() => handleTransactionTypesSelected("negative")}
                title="Outcome"
                type="down"
                isActive={trasactionType === "negative"}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
