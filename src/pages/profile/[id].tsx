import { Badge, Box, Center, Flex, List, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { PaginationNumbers } from "@/components/PaginationNumbers";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { iSellerProfileProps } from "@/interfaces/pages.interfaces";
import { api } from "@/services/api";
import { iAdvertListByUser } from "@/interfaces/advert.interfaces";
import { useEffect } from "react";
import { useAdvertContext } from "@/contexts/advert.context";
import { MessageNoAd } from "@/components/MessageNoAd";

export default ({ seller }: iSellerProfileProps) => {
  const { getAdvertiseListByUserId, advertiseListByUser } = useAdvertContext();

  useEffect(() => {
    getAdvertiseListByUserId(seller.id);
  }, []);

  const changePage = (key: string, value: string) => {
    if (key == "page") {
      getAdvertiseListByUserId(seller.id, value);
    }
  };

  if (advertiseListByUser && advertiseListByUser?.id == seller.id) {
    seller = advertiseListByUser;
  }

  return (
    <Box
      bgGradient={
        "linear-gradient(to bottom, var(--chakra-colors-brand-1) 350px, var(--chakra-colors-grey-8) 350px)"
      }
      minH={"100vh"}
    >
      <Header />
      <Box as={"main"} my={{ base: "65px", md: "75px" }}>
        <Box
          maxW={"1200px"}
          w={{ base: "90%" }}
          m="0 auto"
          bgColor={"grey.10"}
          borderRadius={"4px"}
          p={"40px"}
          mb={"75px"}
        >
          <Center
            as={"p"}
            bg={"brand.2"}
            minW={"104px"}
            boxSize={"104px"}
            borderRadius={"50%"}
            fontWeight={"medium"}
            fontSize={"36px"}
            color={"white"}
            mb={"24px"}
          >
            {`${seller.name[0]}${
              seller.name.split(" ").length > 1
                ? seller.name.split(" ", 2)[1][0]
                : ""
            }`}
          </Center>
          <Flex alignItems={"center"} mb={"24px"} gap={"9px"} flexWrap={"wrap"}>
            <Text fontWeight={"semibold"} fontSize={"20px"} color={"grey.1"}>
              {seller.name}
            </Text>
            {seller.is_seller && (
              <Badge
                fontWeight={"medium"}
                fontSize={"14px"}
                color={"brand.1"}
                bgColor={"brand.4"}
                px={"8px"}
                py={"4px"}
                borderRadius={"4px"}
              >
                Anunciante
              </Badge>
            )}
          </Flex>
          <Text color={"grey.2"} mb={"40px"}>
            {seller.description}
          </Text>
        </Box>

        <List
          w={"90%"}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          m="0 auto"
          gap={"48px"}
        >
          {seller.results.length > 0 ? (
            seller.results.map((advert, index) => (
              <ProductCard key={index} advertData={advert} seller={seller} />
            ))
          ) : (
            <MessageNoAd message="Não existem anúncios cadastrados desse usuário." />
          )}
        </List>
        <PaginationNumbers {...seller} callbackToChangePage={changePage} />
      </Box>
      <Footer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await api
    .get<iAdvertListByUser>(`/advertised/users/${ctx.params!.id}`)
    .then(({ data }) => {
      return { props: { seller: data } };
    })
    .catch(() => {
      return { redirect: { destination: "/", permanent: false } };
    });
};
