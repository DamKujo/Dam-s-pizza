import { Container, ProductFormForPage } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      //можно вынести в отдельную функцию и с помощью useEffect вызывать
      category: {
        include: {
          products: {
            include: {
              variations: true,
            },
          },
        },
      },
      variations: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductFormForPage product={product} />
    </Container>
  );
}
