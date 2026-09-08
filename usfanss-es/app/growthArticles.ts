export const spanishGrowthSlugs = [
  "que-es-usfans-como-funciona",
  "usfans-ropa-guia",
  "usfans-opiniones-fiabilidad",
  "usfans-canarias-envios",
  "spanish-line-packet-usfans",
  "usfans-tiempos-envio-tracking",
  "usfans-devoluciones-almacen",
] as const;

export const spanishGrowthCards: string[][] = [
  ["Guía", "Qué es USFans y cómo funciona en España (2026)", "Compra, almacén, fotos QC, consolidación y envío explicados paso a paso.", "12 min"],
  ["Ropa", "USFans ropa: cómo encontrar enlaces y elegir productos", "Una guía para buscar zapatillas, sudaderas, camisetas y chaquetas sin depender de enlaces antiguos.", "11 min"],
  ["Opiniones", "USFans opiniones y fiabilidad: qué comprobar antes de comprar", "Cómo separar políticas verificables, experiencias públicas y señales de riesgo.", "12 min"],
  ["Canarias", "¿USFans envía a Canarias? Líneas, aduanas y dirección", "Qué revisar antes de consolidar un paquete con destino a las Islas Canarias.", "12 min"],
  ["Líneas", "Spanish Line Packet en USFans: cómo comparar una ruta", "Disponibilidad, peso facturable, seguimiento, límites y coste total.", "10 min"],
  ["Tracking", "USFans tiempos de envío y tracking para España", "Cómo leer cada etapa y cuándo una pausa de seguimiento requiere atención.", "11 min"],
  ["Devoluciones", "Devoluciones USFans desde el almacén: guía práctica", "Evidencias, plazos, vendedor, costes y decisiones antes de consolidar.", "11 min"],
];

const sources = {
  beginner: { label: "Guía oficial para principiantes de USFans", url: "https://www.usfans.com/beginner-guide" },
  usfans: { label: "Sitio oficial de USFans", url: "https://www.usfans.com/" },
  aeat: { label: "Agencia Tributaria: compras por Internet de hasta 150 euros", url: "https://sede.agenciatributaria.gob.es/Sede/aduanas/comercio-electronico-pipe-envios-particulares/compras-internet-envios-particulares/envios-valor-hasta-150-euros.html" },
  canarias: { label: "Agencia Tributaria Canaria: importaciones", url: "https://sede.gobiernodecanarias.org/tributos/jsf/publico/sede/tramites/tramite.jsp?categoria=importaciones" },
  correosCanarias: { label: "Correos: importación en Canarias", url: "https://www.correos.es/es/es/atencion-al-cliente/informacion-aduanera/dua-importacion/importacion-en-canarias" },
};

export const spanishGrowthArticles = [
  {
    standfirst: "USFans es un agente de compra que conecta a compradores internacionales con vendedores de plataformas chinas. Para una persona en España, entender cómo funciona significa separar cuatro momentos: elegir una ficha vigente, comprar mediante el agente, revisar el artículo en el almacén y crear el envío internacional. Esta guía explica cada decisión sin confundir el precio del producto con el coste final ni presentar una estimación como garantía.",
    sections: [
      { heading: "Qué es USFans y qué papel cumple", paragraphs: [
        "USFans se presenta como intermediario para comprar productos publicados en Taobao, 1688 y Weidian. El vendedor original ofrece el artículo; el agente ayuda a tramitar la compra, recibirlo en un almacén, mostrar evidencias visuales y preparar un paquete internacional. Son responsabilidades distintas. Una ficha visible en un índice no significa que el vendedor mantenga el mismo precio, lote, talla o disponibilidad cuando llega el momento de pagar.",
        "Este sitio es una guía independiente y no procesa pedidos. Su función es ordenar productos y explicar controles útiles. Antes de tomar una decisión, abre siempre la ficha de destino, comprueba el dominio, revisa la variante exacta y conserva una referencia del anuncio. Esa separación evita atribuir al índice decisiones que pertenecen al vendedor o al agente.",
      ]},
      { heading: "Cómo buscar un producto sin perder el contexto", paragraphs: [
        "Empieza con una necesidad concreta: tipo de prenda, talla, color, material, presupuesto y detalles importantes. Una búsqueda como “sudadera gris” todavía es amplia; “sudadera con cremallera, medidas publicadas y tejido grueso” permite comparar. Utiliza la spreadsheet o las categorías para crear una lista corta, no para aprobar automáticamente el primer resultado atractivo.",
        "En cada candidato verifica título, fotografías, opciones, tabla de tallas, precio actual, entrega nacional estimada y avisos. Guarda el enlace y la opción elegida. Si aparecen varias versiones con nombres poco claros, pide una diferencia medible. El precio más alto no demuestra por sí solo mejor calidad.",
      ]},
      { heading: "Qué ocurre después de enviar la orden", paragraphs: [
        "Tras el pago, el agente tramita la compra con el vendedor. El estado puede pasar por fases como compra pendiente, pedido realizado, enviado por el vendedor y recibido en almacén. El nombre exacto de los estados puede cambiar, por lo que conviene interpretar la secuencia y leer la explicación mostrada en la cuenta, en lugar de memorizar etiquetas antiguas de tutoriales.",
        "El tiempo hasta el almacén depende principalmente del vendedor y del transporte nacional en China. No lo mezcles con el plazo del envío a España. Si una orden no avanza, revisa mensajes, avisos de stock y solicitudes de pago adicional antes de concluir que existe un problema logístico.",
      ]},
      { heading: "Cómo utilizar las fotos QC", paragraphs: [
        "Cuando el artículo llega al almacén, USFans indica que realiza una inspección y publica fotografías para que el comprador las revise. Esas fotos permiten confirmar identidad visible, color, talla de etiqueta, cantidad, forma general y daños evidentes. No demuestran autenticidad, composición interna, duración ni ajuste perfecto.",
        "Compara las imágenes con la variante guardada. En ropa revisa frente, espalda, impresión, cremalleras, costuras y etiqueta; en calzado compara ambos lados, puntera, talón, suela y talla. Si falta un detalle que cambiaría tu decisión, solicita una imagen o medida concreta y comprueba antes las condiciones vigentes.",
      ]},
      { heading: "Consolidar no significa meterlo todo en una caja", paragraphs: [
        "La consolidación agrupa artículos aceptados en un paquete. Puede reducir cargos repetidos, pero un objeto voluminoso, frágil o restringido también puede aumentar el peso facturable o limitar las rutas de todo el conjunto. Compara una caja frente a dos paquetes con los datos actuales; no existe un peso perfecto aplicable a todos los destinos.",
        "Decide también qué embalaje conservar, retirar, comprimir o reforzar. Quitar una caja puede reducir volumen, pero también protección. Un ensayo de embalaje puede ofrecer medidas más realistas antes del pago final. Revisa que solo entren artículos aprobados y que ninguna devolución siga abierta.",
      ]},
      { heading: "Cómo se elige el envío a España", paragraphs: [
        "Filtra primero por elegibilidad y después por precio. Compara peso real y volumétrico, coste total, seguimiento, plazo estimado, límites de contenido, compensación y requisitos de destino. Una línea barata no sirve si rechaza el contenido o el código postal. Península, Baleares, Canarias, Ceuta y Melilla no deben tratarse como un único destino logístico.",
        "El coste entregado puede incluir producto, transporte nacional, envío internacional, conversión, servicios, impuestos y gestión aduanera. Desde julio de 2026, la Agencia Tributaria explica el nuevo arancel fijo aplicable a determinadas compras a distancia de hasta 150 euros procedentes de fuera de la UE. Comprueba siempre la regla vigente y qué conceptos ya aparecen cobrados.",
      ]},
      { heading: "Proceso resumido para una primera compra", paragraphs: [
        "Define el producto, abre la ficha vigente, guarda la variante, revisa el coste probable y realiza la orden. Cuando llegue al almacén, compara el QC con tu referencia y resuelve cualquier incidencia. Después calcula el paquete con medidas realistas, elige únicamente una ruta disponible para tu contenido y destino, verifica dirección y teléfono y conserva el número de seguimiento.",
        "Este orden reduce decisiones tardías. No garantiza el comportamiento del vendedor, la aceptación de una devolución, una fecha de entrega ni la actuación aduanera. Sí evita errores frecuentes: comprar una variante distinta, aprobar un defecto visible, mezclar un artículo incompatible o pagar una ruta sin revisar el coste completo.",
      ], links: [sources.beginner, sources.usfans, sources.aeat]},
    ],
    takeaway: "USFans funciona como una cadena de decisiones: ficha vigente, compra, llegada al almacén, QC, resolución de incidencias, consolidación y envío. Verifica cada etapa con la información que muestra la cuenta en ese momento.",
  },
  {
    standfirst: "Buscar “USFans ropa” suele significar una de dos cosas: encontrar enlaces actuales o saber si una prenda concreta merece entrar en el pedido. Una buena guía debe resolver ambas. Esta ruta organiza zapatillas, sudaderas, camisetas, chaquetas y camisetas deportivas, pero mantiene la verificación en la ficha final para evitar depender de spreadsheets antiguas, títulos vagos o fotografías que ya no representan la variante disponible.",
    sections: [
      { heading: "Utiliza la spreadsheet como mapa, no como garantía", paragraphs: [
        "Una USFans spreadsheet reúne enlaces y acelera el descubrimiento. Su fecha importa: el vendedor puede cambiar el precio, retirar una talla, sustituir fotografías o cerrar una publicación. Por eso el índice debe llevarte a una ficha comprobable y no actuar como prueba de stock o calidad. Si un enlace ya no abre la opción mostrada, descártalo o busca la referencia actual.",
        "Guarda una lista corta con enlace, categoría, variante, talla, precio visto y fecha de comprobación. Esta pequeña tabla permite comparar sin confundir productos parecidos. Evita acumular cientos de favoritos que nunca vuelves a validar.",
      ]},
      { heading: "Zapatillas: talla, simetría y volumen", paragraphs: [
        "En calzado, la talla nominal es solo el comienzo. Busca una tabla utilizable, longitud interior o medida de plantilla cuando esté disponible y fotografías claras de la etiqueta. Comprueba si la ficha diferencia versiones o lotes. Elige con medidas del pie y margen adecuado, no solo por equivalencia automática entre EU, US y China.",
        "Las cajas ocupan volumen y pueden afectar al envío. Antes de eliminarlas, decide si necesitas la protección estructural. En el QC compara el par completo, punteras, talones, laterales, suelas y etiquetas. Una foto bonita de una sola zapatilla no basta para comprobar simetría.",
      ]},
      { heading: "Sudaderas y camisetas: mide una prenda que ya te queda bien", paragraphs: [
        "Para ropa superior, registra ancho de pecho, largo total, hombros y manga de una prenda propia. Compara esas medidas con la tabla del vendedor y confirma si son de la prenda o del cuerpo. Las letras S, M o XL no mantienen el mismo patrón entre fabricantes ni entre versiones de una misma publicación.",
        "Comprueba composición cuando esté publicada, gramaje solo si existe un dato verificable, tipo de corte y detalles como cremallera, capucha, puños o impresión. En el QC busca etiqueta de talla, posición del gráfico, costuras principales y diferencias de color evidentes; la iluminación puede alterar tonos, así que evita afirmaciones absolutas basadas en una sola imagen.",
      ]},
      { heading: "Chaquetas: estructura, relleno y restricciones", paragraphs: [
        "Una chaqueta puede ser más voluminosa de lo que su peso sugiere. Revisa medidas cerrada, longitud de mangas, capucha, bolsillos y sistema de cierre. Si el anuncio utiliza términos de material o relleno sin especificación verificable, trátalos como descripción del vendedor, no como certificación.",
        "La compresión puede reducir volumen en prendas blandas, pero también deformar acabados o no ser adecuada para todos los materiales. Decide el embalaje después de ver el artículo y las opciones reales de la ruta. No copies una recomendación de otro paquete con distinto contenido.",
      ]},
      { heading: "Camisetas deportivas: nombre, número y versión", paragraphs: [
        "En jerseys y camisetas deportivas, distingue versión, temporada, color, talla y cualquier personalización. Confirma si nombre y número forman parte de la opción o solo de la fotografía promocional. Las prendas personalizadas pueden tener condiciones de devolución diferentes, por lo que la elección debe quedar documentada antes de pagar.",
        "En QC revisa frontal, espalda, escudo, patrocinadores, nombre, número, cuello y etiquetas. Si una medida o impresión es decisiva, pide evidencia específica antes de consolidar. El control visual sirve para detectar discrepancias visibles, no para prometer autenticidad.",
      ]},
      { heading: "Cómo reconocer una ficha útil", paragraphs: [
        "Una ficha útil permite identificar la opción exacta, ofrece imágenes suficientes, incluye medidas comprensibles y muestra avisos o condiciones relevantes. Una ficha débil utiliza títulos genéricos, mezcla muchas versiones sin explicación o carece de referencias de talla. El mejor precio no compensa una selección que no puedes describir ni comprobar después.",
        "Abre siempre el enlace de destino antes de pagar. Comprueba que el dominio sea el esperado, que la página corresponda al producto y que el precio y las opciones sigan vigentes. Guarda solo los enlaces que superan esa revisión.",
      ]},
      { heading: "Ruta de compra para ropa", paragraphs: [
        "Filtra por categoría, crea tres candidatos, compara medidas y variante, estima peso y volumen, y registra tu elección. Tras la llegada, revisa las fotos QC con una lista específica para ese tipo de prenda. Solo después decide si aceptar, pedir más evidencia, intentar una devolución o incluir el artículo en el paquete.",
        "Esta secuencia responde mejor a “USFans ropa” que una lista interminable de nombres. El objetivo no es abrir más enlaces, sino convertir cada enlace en una decisión comprobable y reducir productos que llegan al almacén sin talla, versión o coste logístico bien entendidos.",
      ], links: [sources.beginner, sources.usfans]},
    ],
    takeaway: "Una buena selección de ropa combina enlaces actuales, medidas comparables, variante guardada, control QC por categoría y una estimación del volumen antes del envío.",
  },
  {
    standfirst: "Las búsquedas “USFans opiniones” y “USFans es fiable” no se responden con una frase promocional. La fiabilidad depende de varias capas: que estés en el dominio correcto, que la función anunciada exista, que el vendedor cumpla, que el QC muestre lo pedido, que la ruta sea adecuada y que entiendas los límites de devolución, transporte y aduanas. Este método permite investigar antes de pagar sin convertir una experiencia aislada en una verdad universal.",
    sections: [
      { heading: "Separa plataforma, vendedor y transportista", paragraphs: [
        "USFans actúa como agente entre el comprador y vendedores de plataformas chinas. El agente puede tramitar la compra, recibir la mercancía y preparar el paquete, pero el vendedor sigue influyendo en stock, variante, calidad visible y entrega al almacén. Después, una línea internacional y un operador local intervienen en el transporte.",
        "Una opinión que dice “todo perfecto” o “todo salió mal” puede describir solo una de esas capas. Para utilizarla, identifica qué ocurrió, en qué país, con qué fecha, tipo de producto y fase del pedido. Sin ese contexto, la reseña ayuda poco a predecir tu caso.",
      ]},
      { heading: "Comprueba identidad y navegación antes de pagar", paragraphs: [
        "Escribe el dominio directamente o utiliza un marcador guardado. Comprueba conexión segura, datos de la cuenta y página de pago antes de introducir información. Desconfía de mensajes privados que soliciten continuar fuera del proceso habitual, descargar archivos desconocidos o transferir a una cuenta distinta sin explicación verificable.",
        "Este sitio es independiente y sus enlaces de producto llevan a un catálogo externo. No debe confundirse con la plataforma oficial. Lee la divulgación, confirma el destino de cada enlace y no interpretes un diseño parecido, un logotipo o una posición en Google como prueba de propiedad.",
      ]},
      { heading: "Qué hechos pueden verificarse públicamente", paragraphs: [
        "La guía oficial de USFans describe una secuencia de compra, llegada al almacén, inspección, consolidación y envío. Páginas públicas de producto muestran fotografías QC y, en muchos casos, condiciones sobre solicitud de devolución tras la llegada. Estos datos permiten saber qué funciones se anuncian, pero no garantizan un resultado idéntico en cada orden.",
        "Guarda una copia de los términos visibles al comprar: opción, precio, advertencias, política aplicable y servicios elegidos. Si una condición material no está publicada o no aparece en tu cuenta, considérala no confirmada. No completes el vacío con cifras de vídeos o publicaciones antiguas.",
      ]},
      { heading: "Cómo leer opiniones públicas con criterio", paragraphs: [
        "Busca patrones repetidos en fuentes independientes y recientes. Separa comentarios sobre interfaz, soporte, vendedor, QC, embalaje, transporte y aduanas. Compara países y fechas. Una ruta que funcionó en otro mercado no demuestra disponibilidad en España; una demora durante una campaña tampoco define todos los meses.",
        "Da más peso a reseñas con secuencia, fechas aproximadas y resultado comprobable que a mensajes sin detalles. Las capturas pueden ayudar, pero ocultan contexto y pueden editarse. No compartas nombres, direcciones, pedidos ni números de seguimiento de otras personas.",
      ]},
      { heading: "Señales positivas y límites que deben convivir", paragraphs: [
        "Son señales útiles que la ficha sea clara, la opción quede registrada, el estado avance de forma comprensible, las fotos permitan comparar el artículo y la línea muestre condiciones antes del pago. También importa que puedas conservar recibos y formular una consulta con evidencias.",
        "Ninguna de estas señales convierte la compra en libre de riesgo. El agente no fabrica el producto; el QC es visual; la devolución depende del vendedor y del estado; el transporte tiene restricciones; y el destino puede aplicar impuestos o trámites. Una evaluación honesta conserva ambos lados.",
      ]},
      { heading: "Prueba con un pedido que puedas auditar", paragraphs: [
        "Si decides probar, comienza con un artículo sencillo, bien descrito y de coste que puedas asumir. Evita mezclar en la primera prueba productos restringidos, personalizados o difíciles de medir. Documenta ficha, variante, pago, llegada, QC, instrucciones de paquete y seguimiento.",
        "El objetivo del primer pedido no es demostrar que todo pedido futuro será igual. Sirve para conocer la interfaz y comprobar si puedes entender y registrar cada etapa. Si una incidencia pequeña resulta imposible de documentar o resolver, esa información es más útil que una valoración genérica.",
      ]},
      { heading: "Lista para decidir si USFans encaja contigo", paragraphs: [
        "Confirma dominio, función del agente, vendedor, opción, medidas, coste probable, política visible, límites del QC, ruta disponible y obligaciones de importación. Define además cuánto tiempo y riesgo aceptas. Si dependes de una fecha garantizada, autenticidad certificada o devolución local sencilla, una compra internacional mediante agente puede no corresponder a tus necesidades.",
        "La mejor respuesta a “¿USFans es fiable?” es una decisión basada en evidencias actuales y en tu tolerancia al riesgo. No uses esta guía como recomendación financiera ni como garantía. Revisa las condiciones vigentes antes de cada pago.",
      ], links: [sources.usfans, sources.beginner]},
    ],
    takeaway: "Evalúa USFans por etapas verificables y no por una puntuación aislada: identidad, ficha, vendedor, QC, devolución, paquete, ruta, tracking y obligaciones del destino.",
  },
  {
    standfirst: "La pregunta “¿USFans envía a Canarias?” necesita una respuesta más precisa que sí o no. La opción depende del código postal, la isla, el contenido, el peso embalado y las líneas que la cuenta muestre en ese momento. Además, Canarias tiene trámites e impuestos de importación propios. Esta guía ayuda a comprobar elegibilidad y coste antes de consolidar, sin reutilizar una tarifa para Madrid o Barcelona.",
    sections: [
      { heading: "Introduce primero el destino exacto", paragraphs: [
        "Registra nombre, calle, número, vivienda, localidad, isla, provincia, código postal y teléfono reales. No elijas una provincia peninsular para obtener una estimación más barata. Una ruta visible para otro código postal no prueba cobertura de Canarias, y Tenerife, Gran Canaria, Lanzarote o una isla menor pueden no recibir siempre la misma oferta de última milla.",
        "Comprueba el formato de la dirección antes de almacenar muchos artículos. Si la herramienta de estimación permite introducir destino y contenido, úsala como filtro inicial. Repite la comparación cuando el paquete tenga peso y medidas reales.",
      ]},
      { heading: "Canarias no utiliza el mismo marco fiscal que la Península", paragraphs: [
        "Las Islas Canarias están fuera del territorio de aplicación del IVA y aplican su propio régimen, incluido el IGIC. La Agencia Tributaria Canaria publica trámites específicos de importación y Correos explica que los envíos que entran en Canarias están sujetos a formalidades aduaneras, con procedimientos que cambian según origen, valor y naturaleza.",
        "No calcules el coste copiando únicamente el IVA peninsular. Considera impuestos que procedan, gestión del operador y documentación. Las reglas de bajo valor cambiaron en julio de 2026 y la AEAT señala que el nuevo arancel también puede afectar a compras de consumidores en Canarias. Verifica la información oficial el día de enviar.",
      ]},
      { heading: "Filtra el contenido antes de elegir una línea", paragraphs: [
        "La disponibilidad puede cambiar si el paquete contiene baterías, líquidos, cosmética, imanes, alimentos, artículos frágiles o categorías sujetas a controles. Marca esas características antes de consolidar. Un solo producto puede dejar fuera una ruta que parecía adecuada para ropa corriente.",
        "Si el contenido especial es opcional, compara separarlo. No supongas que dos paquetes serán siempre más baratos: cada uno puede tener cargo base, gestión y documentación. La decisión debe salir de dos cotizaciones vigentes con el destino exacto.",
      ]},
      { heading: "Usa peso embalado y volumen realista", paragraphs: [
        "La tarifa puede utilizar peso real, volumétrico o el mayor de ambos. Las cajas de calzado, bolsos estructurados y chaquetas acolchadas pueden elevar el peso facturable. Suma embalaje exterior y protección; las medidas de una ficha individual no representan el paquete final.",
        "Si el volumen puede cambiar la ruta o el precio, considera un ensayo de embalaje. Decide si retirar cajas, comprimir textiles o reforzar productos según el contenido. Conserva margen en el presupuesto para diferencias de medición y cargos del destino.",
      ]},
      { heading: "Documentación que conviene conservar", paragraphs: [
        "Guarda factura o justificante de compra, descripción correcta de la mercancía, valor, comprobantes de pago, contenido del paquete, peso, línea y tracking. Correos señala que los trámites pueden requerir factura comercial, justificante de pago u otros documentos. Prepararlos antes reduce idas y vueltas si el operador solicita información.",
        "La declaración debe ser exacta y comprensible. No copies descripciones de otros compradores ni reduzcas valores para intentar evitar cargos. Además del riesgo legal, una declaración incorrecta puede dificultar una reclamación o compensación.",
      ]},
      { heading: "Cómo comparar rutas para Canarias", paragraphs: [
        "Crea una tabla con elegibilidad, peso facturable, coste pagado al agente, seguimiento, plazo estimado, operador de última milla, restricciones, protección y conceptos aduaneros conocidos. Descarta primero las rutas no disponibles. Entre las restantes, valora coste y trazabilidad juntos.",
        "No conviertas el plazo estimado en fecha prometida. Procesamiento, exportación, vuelo, aduanas y reparto insular añaden variación. Si el paquete tiene una fecha crítica, deja margen o elige otro tipo de compra.",
      ]},
      { heading: "Control final antes de enviar", paragraphs: [
        "Comprueba que todos los artículos están aceptados, la devolución está cerrada, la dirección conserva isla y código postal, el teléfono funciona, el contenido cumple la ruta y el peso ensayado coincide con la cotización. Revisa qué impuestos o gastos aparecen incluidos y cuáles podrían cobrarse en destino.",
        "Solo entonces paga el envío y guarda las condiciones. USFans puede mostrar una ruta para Canarias en un momento y no en otro; la cuenta y el paquete actuales son la fuente operativa. Las fuentes oficiales canarias y estatales son la referencia para trámites e impuestos.",
      ], links: [sources.canarias, sources.correosCanarias, sources.aeat, sources.beginner]},
    ],
    takeaway: "Para Canarias, verifica código postal real, contenido, peso embalado, línea disponible, documentación, IGIC y gestión aduanera. Una tarifa peninsular nunca debe usarse como presupuesto local.",
  },
  {
    standfirst: "“Spanish Line Packet USFans” aparece en búsquedas de usuarios que intentan identificar una ruta concreta. El nombre por sí solo no indica que esté disponible para todos los paquetes ni que sea la opción más barata o rápida. Una línea debe evaluarse con la cotización que muestra la cuenta: destino, contenido, peso facturable, seguimiento, restricciones, plazo y compensación.",
    sections: [
      { heading: "Confirma que el nombre corresponde a la ruta actual", paragraphs: [
        "Los nombres comerciales pueden cambiar o agrupar servicios distintos. Abre la estimación o creación de paquete y verifica que Spanish Line Packet aparece para tu código postal y contenido. No utilices una captura antigua, una tabla de otro país ni una recomendación de vídeo como confirmación.",
        "Lee la descripción completa: rango de peso, dimensiones, artículos admitidos, recargos, seguimiento, plazo estimado y condiciones de protección. Si la información no está visible, pide aclaración antes de pagar.",
      ]},
      { heading: "Calcula el peso facturable", paragraphs: [
        "Compara peso real y volumétrico según la fórmula mostrada. Un paquete ligero con gran volumen puede pagar como uno mucho más pesado. Añade caja exterior, relleno y protección. La suma de pesos de producto rara vez coincide exactamente con la medida final.",
        "Para ropa blanda puede existir opción de compresión; para calzado, bolsos o artículos frágiles quizá convenga conservar estructura. Calcula dos escenarios cuando la decisión de embalaje sea importante y utiliza un ensayo si el servicio está disponible.",
      ]},
      { heading: "Comprueba restricciones y destino", paragraphs: [
        "Baterías, líquidos, cosméticos, imanes, alimentos y mercancía sensible pueden reducir las líneas. La ruta más atractiva para camisetas puede desaparecer cuando se añade un objeto restringido. Verifica artículo por artículo antes de consolidar.",
        "España tampoco es un destino uniforme. Confirma Península, Baleares, Canarias, Ceuta o Melilla con el código postal exacto. No deduzcas cobertura por el nombre “Spanish”.",
      ]},
      { heading: "Compara coste total, no solo la primera cifra", paragraphs: [
        "Registra transporte internacional, embalaje, servicios, conversión y posibles cargos de destino. Una línea con tarifa base menor puede resultar peor si utiliza un peso volumétrico alto o requiere servicios adicionales. Conserva margen para diferencias de medida.",
        "Compara también qué ocurre si el paquete no puede entregarse, requiere documentación o se devuelve. Las condiciones de compensación, exclusiones y pruebas pueden importar más que una pequeña diferencia inicial.",
      ]},
      { heading: "Seguimiento y plazo", paragraphs: [
        "Comprueba qué eventos de tracking ofrece la ruta y qué operador realiza la entrega final. Entre salida del almacén y primer escaneo local pueden existir periodos sin actualización. Una pausa no demuestra pérdida; compara el tiempo con el rango publicado y el estado operativo.",
        "Guarda número de paquete, tracking, fecha de pago y condiciones de la línea. Si se supera el umbral de soporte mostrado, envía una consulta con esos datos, no varios mensajes sin referencia.",
      ]},
      { heading: "Aduanas e impuestos", paragraphs: [
        "El nombre de una línea no elimina obligaciones de importación. Revisa si la cotización explica impuestos o trámites, y contrástalo con las fuentes oficiales españolas. Desde julio de 2026 existe un nuevo arancel fijo para determinadas compras a distancia de hasta 150 euros procedentes de fuera de la UE, independiente del IVA aplicable.",
        "No presentes una línea como “sin aduanas” salvo que las condiciones actuales expliquen exactamente el procedimiento. Incluso cuando un concepto se cobra de antemano, conserva factura y justificantes.",
      ]},
      { heading: "Decisión en seis columnas", paragraphs: [
        "Compara Spanish Line Packet con las otras opciones disponibles usando seis columnas: elegibilidad, peso facturable, coste total, seguimiento, plazo y protección. Descarta cualquier ruta incompatible. Entre las restantes, elige según valor del paquete, urgencia, claridad de condiciones y tolerancia al riesgo.",
        "Repite la comparación inmediatamente antes del pago. Tarifas, capacidad y reglas pueden cambiar. Esta guía enseña un método y no confirma que la ruta esté activa para un paquete concreto.",
      ], links: [sources.beginner, sources.aeat]},
    ],
    takeaway: "Spanish Line Packet solo es una opción válida cuando aparece para tu paquete actual. Decide con elegibilidad, peso facturable, coste total, tracking, plazo, protección y obligaciones de destino.",
  },
  {
    standfirst: "Los tiempos de envío de USFans a España no son una sola cuenta atrás. Hay al menos tres relojes: el vendedor hasta el almacén, el procesamiento del paquete y el transporte internacional con aduanas y reparto local. Separarlos permite entender el tracking, detectar dónde se encuentra una pausa y formular una consulta útil sin asumir que cada periodo sin escaneo significa pérdida.",
    sections: [
      { heading: "Reloj uno: vendedor y transporte nacional", paragraphs: [
        "Después de la orden, el agente debe tramitar la compra y el vendedor debe preparar y enviar el artículo. Stock, preventa, personalización y transporte nacional influyen. Esta fase termina cuando el almacén registra la recepción, no cuando aparece el pago del pedido.",
        "Si el estado no cambia, revisa avisos de falta de stock, diferencias de precio o mensajes. Un pedido detenido antes del almacén no se resuelve consultando al transportista internacional.",
      ]},
      { heading: "Reloj dos: recepción, QC y decisión", paragraphs: [
        "El almacén registra el artículo y publica fotografías QC. El tiempo que dedicas a revisar, pedir una medida o abrir una devolución forma parte de la espera total, aunque todavía no exista paquete internacional. Resolver esta etapa con rapidez ayuda a no perder ventanas del vendedor.",
        "Asigna a cada artículo un estado: aceptar, preguntar, devolver o esperar. No consolides mientras una incidencia siga abierta. El tracking internacional comienza después de crear y pagar el paquete, no con la llegada del producto al almacén.",
      ]},
      { heading: "Reloj tres: preparación y salida del paquete", paragraphs: [
        "Tras elegir artículos, embalaje y línea, el almacén prepara el paquete, mide, etiqueta y entrega a la red logística. Un número de tracking puede crearse antes del primer movimiento físico. Por eso “información recibida” no equivale a vuelo iniciado.",
        "Guarda fecha de pago, número del paquete, peso, línea e instrucciones. Si el peso o contenido requiere una revisión, la salida puede esperar una acción en la cuenta. Comprueba notificaciones antes de interpretar el silencio como retraso del transportista.",
      ]},
      { heading: "Cómo leer los eventos de tracking", paragraphs: [
        "Agrupa eventos por fase: datos electrónicos, recogida, exportación, transporte, llegada al país, aduanas, operador local y entrega. Las traducciones automáticas pueden variar. Concéntrate en lugar, fecha y cambio de fase, no en una palabra aislada.",
        "Es normal que distintos sistemas actualicen con ritmos diferentes. Compara el seguimiento del agente y, cuando exista, el del transportista final. No publiques el número completo en foros o redes; puede revelar información de la entrega.",
      ]},
      { heading: "Cuándo una pausa merece una consulta", paragraphs: [
        "Consulta el rango estimado y el umbral de soporte de la línea. Festivos, campañas, capacidad aérea, inspección y transferencia al operador local generan huecos. Una pausa breve dentro del rango no demuestra incidencia.",
        "Cuando el paquete supera el plazo o muestra una excepción explícita, prepara una consulta con número de paquete, tracking, último evento, fecha y captura sin datos privados innecesarios. Una descripción concreta facilita que soporte identifique la fase.",
      ]},
      { heading: "Aduanas y última milla en España", paragraphs: [
        "La llegada al país no significa entrega inmediata. Puede existir control aduanero, solicitud de documentación, cobro o transferencia al operador local. Conserva factura, pago y descripción del contenido por si se solicitan.",
        "Después del despacho, sigue el código en el operador final cuando esté disponible. Revisa dirección, teléfono, intentos de entrega y punto de recogida. Canarias, Ceuta y Melilla pueden tener procesos distintos a Península y Baleares.",
      ]},
      { heading: "Cómo planificar sin una fecha garantizada", paragraphs: [
        "Suma rangos para vendedor, QC, decisiones, embalaje y transporte; añade margen para aduanas y reparto. No compres mediante una cadena internacional para una fecha inamovible sin aceptar el riesgo. Las estimaciones describen escenarios, no citas de entrega.",
        "La mejor información es el estado actual de tu pedido y las condiciones de la línea el día del pago. Guarda un registro simple y actúa cuando exista una señal concreta o se supere el umbral indicado.",
      ], links: [sources.beginner, sources.aeat]},
    ],
    takeaway: "Separa vendedor, almacén, preparación, transporte, aduanas y última milla. Interpreta el tracking por fases y contacta con soporte con datos concretos cuando se supere el rango aplicable.",
  },
  {
    standfirst: "Una devolución USFans desde el almacén ocurre antes del envío internacional y depende de la relación con el vendedor, el tipo de producto, su estado, las evidencias y las condiciones visibles en la orden. Muchas fichas públicas mencionan una solicitud dentro de cinco días tras la llegada y negociación por parte del agente, pero eso no equivale a devolución automática, gratuita o aceptada en todos los casos.",
    sections: [
      { heading: "Revisa la condición antes de comprar", paragraphs: [
        "Antes del pago, busca avisos sobre personalización, higiene, preventa, cambios, devolución o transporte nacional. Guarda una captura de la variante y las condiciones materiales. Si una opción aparece como no retornable o la política no está clara, decide si puedes asumir ese riesgo.",
        "No confíes en una regla genérica de otro vendedor. Dos productos dentro del mismo agente pueden tener condiciones distintas. La ficha y el estado actual de la orden son la referencia operativa.",
      ]},
      { heading: "Inspecciona en cuanto aparezca el QC", paragraphs: [
        "Compara producto, color, talla, cantidad, forma, daños, accesorios y detalles decisivos con tu registro. Amplía las imágenes. Si falta el ángulo que demostraría el problema, solicita una foto o medida concreta y comprueba el coste antes.",
        "Una impresión como “no me gusta” es difícil de tramitar. Una diferencia como “pedí talla XL y la etiqueta muestra M” puede localizarse en la orden y la fotografía. Describe hechos visibles y referencia el archivo correspondiente.",
      ]},
      { heading: "Qué significa el plazo de cinco días", paragraphs: [
        "Páginas públicas de producto de USFans indican con frecuencia que se puede solicitar devolución dentro de cinco días tras la llegada al almacén y que el agente negociará con el vendedor. El verbo importante es solicitar. La aceptación, el método y los costes dependen de condiciones adicionales.",
        "Actúa pronto, pero lee el contador o fecha que muestre tu orden. No esperes al último momento para pedir otra foto, discutir con otras personas o añadir el artículo al paquete. Una vez procesado para envío internacional, la situación cambia.",
      ]},
      { heading: "Prepara una solicitud que pueda verificarse", paragraphs: [
        "Incluye número de orden, variante pedida, diferencia observada, fotografía QC y solución solicitada. Mantén el mensaje corto y objetivo. Si el problema es una medida, indica puntos exactos; si falta una pieza, enumera la cantidad recibida y esperada.",
        "Evita insultos, amenazas o varias solicitudes contradictorias. Guarda respuesta, condiciones, coste de retorno y fecha. Un registro ordenado facilita decidir si aceptar, cambiar o devolver.",
      ]},
      { heading: "Costes y resultados posibles", paragraphs: [
        "El vendedor puede aceptar una devolución, ofrecer cambio, pedir pruebas, aplicar condiciones o rechazarla. Puede existir transporte de retorno dentro de China y otros cargos. No asumas que la solicitud es gratuita hasta que la cuenta confirme importes y resultado.",
        "Compara el coste y tiempo de devolver con el valor del artículo y el riesgo de conservarlo. Esta comparación no obliga a aceptar un producto incorrecto; ayuda a entender las opciones reales antes de decidir.",
      ]},
      { heading: "No consolides un artículo en disputa", paragraphs: [
        "Mantén el artículo fuera del paquete mientras exista una consulta, devolución o cambio. Si consolidas demasiado pronto, puedes cerrar opciones o añadir trabajo. Revisa que el estado final esté reflejado antes de pagar el envío.",
        "Cuando llega un reemplazo, trátalo como una nueva recepción: verifica variante y QC. No presupongas que el cambio corrige automáticamente el problema original.",
      ]},
      { heading: "Lista final de devolución", paragraphs: [
        "Comprueba política previa, fecha de llegada, plazo visible, variante guardada, evidencia QC, descripción objetiva, solución deseada, costes y estado del paquete. Conserva comunicaciones y no expongas datos privados en una publicación pública.",
        "Esta guía no garantiza que un vendedor acepte el caso. Su objetivo es que presentes una solicitud clara mientras todavía puede resolverse dentro de China y que no pierdas opciones por falta de evidencia o consolidación prematura.",
      ], links: [sources.beginner, sources.usfans]},
    ],
    takeaway: "Revisa el QC inmediatamente, describe una diferencia verificable, solicita dentro del plazo mostrado, confirma costes y aceptación, y mantén el artículo fuera del paquete hasta cerrar el caso.",
  },
];
