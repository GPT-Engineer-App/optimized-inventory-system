import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, IconButton, Input, Select, SimpleGrid, Stack, Table, Tbody, Td, Text, Textarea, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({ name: "", description: "", sku: "", category: "", variants: [] });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const addProduct = () => {
    if (!currentProduct.name || !currentProduct.sku) {
      toast({
        title: "Error",
        description: "Name and SKU are required to add a product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    setCurrentProduct({ name: "", description: "", sku: "", category: "", variants: [] });
    toast({
      title: "Product Added",
      description: "The product has been added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    toast({
      title: "Product Deleted",
      description: "The product has been removed successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const editProduct = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
  };

  const saveProduct = () => {
    setProducts(products.map((product) => (product.id === currentProduct.id ? currentProduct : product)));
    setCurrentProduct({ name: "", description: "", sku: "", category: "", variants: [] });
    setEditMode(false);
    toast({
      title: "Product Updated",
      description: "The product has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={5}>
        <Heading>Inventory Management System</Heading>
        <Flex w="full" justifyContent="space-between">
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => setEditMode(false)}>
            Add New Product
          </Button>
        </Flex>
        <Box as="form" w="full">
          <SimpleGrid columns={2} spacing={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={currentProduct.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input name="sku" value={currentProduct.sku} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select name="category" value={currentProduct.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="apparel">Apparel</option>
                <option value="furniture">Furniture</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={currentProduct.description} onChange={handleInputChange} />
            </FormControl>
          </SimpleGrid>
          <Stack direction="row" spacing={4} align="center" justifyContent="center" mt={5}>
            {editMode ? (
              <Button leftIcon={<FaSave />} colorScheme="green" onClick={saveProduct}>
                Save Product
              </Button>
            ) : (
              <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addProduct}>
                Add Product
              </Button>
            )}
          </Stack>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>SKU</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.sku}</Td>
                <Td>{product.category}</Td>
                <Td>{product.description}</Td>
                <Td>
                  <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => editProduct(product)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} ml={2} onClick={() => deleteProduct(product.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
