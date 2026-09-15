# Feed do Google Merchant Center

O feed é gerado em `public/merchant/merchant-products.xml` e pode ser cadastrado, depois do deploy, com a URL:

`https://epimarketplace.com/merchant/merchant-products.xml`

Ele só publica produtos cujos dados comerciais foram confirmados. Isso evita informar preço, estoque, marca, CA ou identificadores inexistentes.

## Como ativar um produto

Em `data/merchant-overrides.json`, adicione a referência como chave em `products`:

```json
{
  "currency": "BRL",
  "products": {
    "1300534000": {
      "price": 299.9,
      "availability": "in_stock",
      "condition": "new",
      "brand": "Marca confirmada",
      "gtin": "7890000000000"
    }
  }
}
```

Se não houver GTIN, use um MPN confirmado ou, apenas quando o produto não tiver identificador, `"identifierExists": false`. O `price`, a disponibilidade e os identificadores precisam corresponder ao que aparece na página individual do produto.

## Antes de enviar ao Merchant Center

1. Confirme preço, disponibilidade, marca e identificadores com a fonte comercial.
2. Execute `npm run build` para recriar as páginas e os dois formatos de feed (`.xml` e `.tsv`).
3. Faça o deploy e cadastre o XML no Merchant Center.
4. Configure frete e devoluções no Merchant Center e trate os diagnósticos antes de ativar campanhas.

O relatório `data/merchant-feed-report.json` lista as referências que ainda precisam de informação. Enquanto a fonte Serveq mostra preço `R$ 0,00` / sob consulta, nenhum produto é enviado como oferta: o Google exige preço e disponibilidade exatos e não aceita `0` como preço de um produto comum.
