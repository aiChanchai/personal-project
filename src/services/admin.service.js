import prisma from "../config/prisma.config.js";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const createCategory = async (title) => {
  return await prisma.category.create({
    data: { title },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
};

export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
};

export const updateCategory = async (id, title) => {
  return await prisma.category.update({
    where: { id },
    data: { title },
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
  });
};

export const deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
};

export const searchUserByEmail = async (searchTerm) => {
  return await prisma.user.findMany({
    where: {
      email: {
        startsWith: searchTerm,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
