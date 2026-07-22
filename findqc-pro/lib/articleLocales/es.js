export const esArticleUi = {
  journalMetadataTitle: "Guías de FindQC: búsquedas, fotos QC y agentes de compra",
  journalMetadataDescription: "Guías verificadas sobre las búsquedas de FindQC, las señales de producto, la revisión de fotos QC y el proceso con un agente de compra.",
  journalSchemaName: "Revista de investigación de FindQC Pro",
  journalCount: "05 guías detalladas",
  journalNote: "Cada artículo está redactado en español, se contrasta con páginas actuales propiedad de FindQC y enlaza sus fuentes oficiales. Las imágenes editoriales se identifican claramente y no se presentan como pruebas QC de almacén.",
  editorialDesk: "Redacción de FindQC Pro",
  factChecked: "Datos verificados",
  heroCaption: "Imagen editorial utilizada para ilustrar el objeto de la inspección. No se presenta como una foto QC de un almacén de FindQC.",
  contents: "En este artículo",
  researchNotes: "Notas de investigación",
  officialSources: "Fuentes oficiales consultadas",
  sourceIntro: "Esta guía editorial independiente se contrastó con las siguientes páginas propiedad de FindQC el 20 de julio de 2026. Las funciones y políticas pueden cambiar; comprueba siempre la información vigente en la fuente.",
  independentNote: "FindQC Pro es un sitio independiente de descubrimiento y formación. No es FindQC ni afirma gestionar su servicio.",
  continueResearch: "Continúa investigando",
  relatedNotes: "Artículos relacionados",
  allArticles: "Todos los artículos",
  readArticle: "Leer artículo",
  home: "Inicio",
  journal: "Artículos",
};

export const esArticleSources = {
  "https://findqc.com/": {
    label: "Página principal de FindQC",
    note: "Descripciones actuales de Trending, Karma, Review Wall, Real Hauls y de la navegación pública.",
  },
  "https://findqc.com/terms-of-service": {
    label: "Condiciones de servicio de FindQC",
    note: "Descripción oficial del servicio, de las compras realizadas por terceros y de los límites de los datos QC.",
  },
  "https://findqc.com/privacy-policy": {
    label: "Política de privacidad de FindQC",
    note: "Explicación oficial de la búsqueda, la popularidad, las colecciones y los registros QC de terceros.",
  },
  "https://academy.findqc.com/2024/12/21/mastering-qc-finder-choosing-the-best-search-method/": {
    label: "FindQC Academy: cómo elegir un método de búsqueda",
    note: "Comparación oficial entre la búsqueda por enlace, por imagen y por palabras clave.",
  },
  "https://findqc.com/robots": {
    label: "Bot de FindQC",
    note: "Descripción oficial del análisis de enlaces, el reconocimiento de imágenes y el material QC disponible en Discord.",
  },
};

export const esArticles = {
  "before-you-buy-qc-guide": {
    title: "Cómo usar FindQC antes de comprar: lista práctica para revisar fotos QC",
    shortTitle: "Lista práctica para revisar fotos QC",
    description: "Un método contrastado para relacionar un resultado de FindQC con la oferta correcta, leer las fotos QC del almacén y decidir sin convertir imágenes limitadas en una garantía.",
    excerpt: "Confirma la oferta, revisa el conjunto completo de imágenes, compara medidas y separa lo visible de lo que una fotografía no puede demostrar.",
    category: "Guía de FindQC",
    readTime: "10 min de lectura",
    date: "20 de julio de 2026",
    heroAlt: "Un par de zapatillas grises fotografiado desde arriba junto a una caja",
    keywords: ["FindQC", "guía FindQC", "fotos QC", "control de calidad en almacén", "agente de compra"],
    intro: [
      "Una revisión útil no empieza ampliando un logotipo. Empieza confirmando que el registro pertenece al producto que piensas comprar. Después hay que distinguir entre un dato visible y una suposición. FindQC reúne enlaces y material QC en una misma interfaz de investigación, pero no decide por el comprador ni sustituye la comprobación de la oferta vigente.",
      "El siguiente proceso puede utilizarse dos veces: antes de realizar el pedido, para descartar candidatos débiles, y cuando el agente publica las fotos de la unidad que llegó a su almacén. La segunda revisión merece más peso porque se refiere al artículo concreto asociado a tu pedido.",
    ],
    sections: [
      {
        id: "role",
        title: "1. Entiende bien qué hace FindQC",
        blocks: [
          { type: "p", text: "Las Condiciones de servicio describen FindQC como una plataforma de descubrimiento y agregación de controles QC. Puede ofrecer búsqueda por enlace o imagen, QC normal y premium, conversión de enlaces, ayuda con tallas y un bot de Discord. Su función es ordenar información para investigar, no vender el producto." },
          { type: "p", text: "La compra, el pago, el transporte y las devoluciones corresponden a vendedores y agentes externos. Por eso, un precio, una variante o una condición de devolución observados durante la investigación deben volver a comprobarse en la página donde se efectuará la operación." },
          { type: "callout", title: "Modelo mental correcto", text: "FindQC es la mesa de investigación; la oferta original contiene las condiciones comerciales; las fotos de tu almacén muestran la unidad que realmente recibiste." },
        ],
      },
      {
        id: "listing",
        title: "2. Confirma la oferta antes de juzgar las fotos",
        blocks: [
          { type: "p", text: "Si ya tienes una URL de Taobao, Weidian o 1688, empieza por ese enlace exacto. La Academy de FindQC considera la búsqueda por enlace la opción más precisa cuando existe un objetivo claro, aunque advierte de que un enlace roto, sustituido o eliminado puede devolver un resultado antiguo o distinto." },
          { type: "list", title: "Cinco comprobaciones de identidad", items: [
            "La plataforma y el enlace de origen coinciden con tu candidato.",
            "El vendedor o la tienda no han cambiado silenciosamente.",
            "El color, el modelo y la variante son los que quieres pedir.",
            "El registro no aparece como retirado o no disponible.",
            "El precio, el envío nacional y la devolución se confirman en la página de compra.",
          ] },
          { type: "p", text: "Dos vendedores pueden reutilizar la misma fotografía promocional. Una portada idéntica o un título parecido no demuestran que la fábrica, el lote o la variante sean iguales. Primero establece la identidad; después valora la calidad visible." },
        ],
      },
      {
        id: "whole-item",
        title: "3. Lee todo el conjunto: de la vista general al detalle",
        blocks: [
          { type: "p", text: "Abre todas las imágenes antes de decidir. Empieza por las vistas frontal, posterior, lateral y superior disponibles. Comprueba la silueta, la simetría, la alineación de paneles, la uniformidad del color y la presencia de todas las piezas. Una sola toma rara vez ofrece contexto suficiente." },
          { type: "p", text: "Después revisa uniones de costuras, dobladillos, cuello, puños, cremalleras, ojales, bordados, bordes de estampado y herrajes. Una reflexión de luz no equivale a un arañazo; una arruga de transporte no equivale a una prenda torcida. Busca el mismo indicio en más de un ángulo." },
          { type: "figure", image: "/products/jacket.webp", alt: "Chaqueta oscura utilizada como ejemplo editorial", caption: "Ejemplo editorial: la vista general sirve para valorar la forma antes de ampliar cremalleras, costuras o bordados. No es un registro QC de FindQC." },
          { type: "p", text: "Termina con etiquetas, accesorios y embalaje. Verifica que la talla fotografiada coincida con la variante del pedido y que no falten piezas extraíbles. El embalaje no demuestra calidad, pero sí puede revelar faltantes o un riesgo claro de daño durante el transporte." },
        ],
      },
      {
        id: "measurements",
        title: "4. Trata las medidas como pruebas, no como decoración",
        blocks: [
          { type: "p", text: "El ángulo de la cámara altera la percepción del tamaño. Si aparece una regla o una cinta, compara sus extremos con la tabla del vendedor y con una prenda u objeto que ya poseas. En ropa suelen ser útiles el ancho de pecho, el largo, los hombros, las mangas, la cintura y la entrepierna; en calzado, la plantilla puede ser más informativa que la talla impresa." },
          { type: "p", text: "Lee también el método. Una cinta curvada, una prenda doblada o un punto de inicio distinto puede cambiar varios centímetros. No mezcles ancho en plano con contorno corporal, ni longitud de suela exterior con longitud útil de plantilla." },
          { type: "callout", title: "Regla práctica", text: "Compara elementos medidos del mismo modo: prenda plana con prenda plana, plantilla con plantilla y exactamente los mismos puntos de inicio y final." },
        ],
      },
      {
        id: "signals",
        title: "5. Usa las señales de la comunidad como contexto",
        blocks: [
          { type: "p", text: "La portada de FindQC diferencia Trending, Karma, Review Wall y Real Hauls. Estas secciones ayudan a descubrir productos y a identificar preguntas frecuentes, pero responden a cuestiones distintas: atención, preferencia comunitaria, observaciones de compradores o ejemplos de paquetes enviados." },
          { type: "p", text: "Popularidad no significa durabilidad. Una reseña puede pertenecer a otra talla, color, fecha o lote, y un haul solo muestra que un paquete completó una ruta. Comprueba fecha, enlace y tamaño de la muestra antes de asignar peso a esas señales." },
          { type: "p", text: "La confianza mejora cuando varias pistas independientes coinciden: la oferta es la correcta, diferentes sets QC muestran una construcción estable, las medidas encajan y reseñas recientes repiten la misma observación. Aun así, el riesgo nunca desaparece por completo." },
        ],
      },
      {
        id: "limits",
        title: "6. Reconoce lo que las fotos QC no pueden demostrar",
        blocks: [
          { type: "p", text: "Según FindQC, las fotos, el peso, las dimensiones y los registros de defectos proceden normalmente de agentes externos. La plataforma organiza esos datos, pero no garantiza que sean completos, exactos o auténticos, ni ofrece una certificación de autenticidad." },
          { type: "p", text: "Una imagen puede mostrar una mancha, una pieza ausente, un estampado torcido o un color diferente. Normalmente no demuestra composición de fibras, resistencia a largo plazo, salud de una batería, impermeabilidad, comodidad, olor o construcción interna. Lo que queda fuera del encuadre sigue siendo desconocido." },
          { type: "p", text: "Los registros públicos sirven para decidir si merece la pena investigar una oferta. Las fotos de tu propio artículo sirven para aceptar, pedir información adicional, cambiar o devolver esa unidad, siempre dentro de las normas vigentes del vendedor y del agente." },
        ],
      },
      {
        id: "workflow",
        title: "7. Flujo de decisión en diez minutos",
        blocks: [
          { type: "list", title: "Revisa en este orden", items: [
            "Minuto 1: guarda el enlace exacto y la variante elegida.",
            "Minutos 2–3: confirma vendedor, disponibilidad y condiciones actuales.",
            "Minutos 4–5: examina forma, color, simetría y piezas incluidas.",
            "Minutos 6–7: amplía los detalles importantes para la categoría.",
            "Minuto 8: compara las medidas con tu objeto de referencia.",
            "Minuto 9: busca problemas repetidos en reseñas recientes.",
            "Minuto 10: decide aceptar, pedir más pruebas o rechazar.",
          ] },
          { type: "p", text: "Cuando falte información, nombra la vista necesaria: primer plano de una marca, fotografía de la etiqueta, medida de la plantilla o imagen de los accesorios. Una petición específica es más fácil de ejecutar y de evaluar que un mensaje genérico pidiendo “más fotos”." },
          { type: "p", text: "El objetivo no es eliminar todo riesgo, sino tomar la siguiente decisión con la mejor evidencia disponible mientras el artículo aún se encuentra en una fase en la que el agente puede intervenir." },
        ],
      },
    ],
    cta: { eyebrow: "Continúa la revisión", title: "Utiliza la lista de siete etapas para fotos de almacén", label: "Abrir la lista QC" },
  },

  "findqc-search-methods": {
    title: "Métodos de búsqueda de FindQC: enlace, imagen o palabras clave",
    shortTitle: "Enlace, imagen o palabras clave",
    description: "Cuándo utilizar cada método de búsqueda de FindQC, cómo puede fallar y qué comprobar antes de considerar que el resultado corresponde a tu producto.",
    excerpt: "Conserva la pista más precisa que ya tienes y valida el resultado en vez de confiar en la primera coincidencia visual.",
    category: "Estrategia de búsqueda",
    readTime: "9 min de lectura",
    date: "20 de julio de 2026",
    heroAlt: "Camiseta blanca doblada utilizada como ejemplo editorial de búsqueda",
    keywords: ["búsqueda FindQC", "buscar por enlace", "búsqueda por imagen", "palabras clave FindQC", "encontrar fotos QC"],
    intro: [
      "Un enlace completo, una captura recortada y un nombre impreciso contienen cantidades de información muy diferentes. Por eso no deben introducirse de la misma manera. FindQC ofrece varias vías de descubrimiento y su Academy compara expresamente la búsqueda por enlace, imagen y palabras clave.",
      "La mejor opción no es la que parece más avanzada, sino la que conserva el identificador más fuerte del que ya dispones. Después de encontrar candidatos, aplica siempre la misma verificación para evitar convertir una similitud en una identidad falsa.",
    ],
    sections: [
      {
        id: "decision",
        title: "1. Elige el método según la prueba inicial",
        blocks: [
          { type: "p", text: "Si posees la URL original de Taobao, Weidian o 1688, contiene un identificador directo y debe ser el primer intento. Si solo tienes una fotografía limpia, la búsqueda visual puede proponer artículos parecidos. Si conoces un nombre, un modelo o una categoría, las palabras clave permiten explorar un conjunto más amplio." },
          { type: "table", headers: ["Pista disponible", "Primer método", "Riesgo principal"], rows: [
            ["URL válida del producto", "Enlace", "La oferta puede estar rota, sustituida o eliminada"],
            ["Foto clara y distintiva", "Imagen", "Productos parecidos pueden proceder de vendedores distintos"],
            ["Nombre, modelo o categoría", "Palabras clave", "El idioma y la redacción generan ruido"],
            ["Captura con texto parcial", "Imagen y después palabras", "Recortes y elementos superpuestos reducen precisión"],
          ] },
          { type: "p", text: "No descartes un enlace exacto para buscar un nombre genérico. Cada paso que se aleja de un identificador único crea más candidatos que tendrás que filtrar manualmente." },
        ],
      },
      {
        id: "link-search",
        title: "2. Búsqueda por enlace: la ruta más corta",
        blocks: [
          { type: "p", text: "FindQC Academy la describe como precisa y rápida cuando el objetivo está claro. Pega la URL completa del artículo, no la página de la tienda, una dirección de alojamiento de imágenes o un enlace social acortado. Conserva el identificador del producto aunque elimines parámetros de seguimiento." },
          { type: "p", text: "Un resultado exitoso todavía necesita una comprobación de identidad. Compara plataforma, tienda, título, portada y variante. Si el artículo figura como eliminado, considera el registro un archivo útil para investigar, no una prueba de que todavía pueda comprarse." },
          { type: "list", title: "Utiliza el enlace cuando", items: [
            "Una hoja, un vendedor o una publicación comparte la URL del marketplace.",
            "Buscas material QC de una oferta concreta, no alternativas parecidas.",
            "Quieres volver al mismo candidato sin reconstruir una consulta.",
          ] },
          { type: "p", text: "Si no aparece nada, no concluyas que no existen fotos QC. El enlace puede haber caducado. Extrae el título y la imagen principal y continúa con el siguiente método sin perder la URL original." },
        ],
      },
      {
        id: "image-search",
        title: "3. Búsqueda por imagen: buena para reconocer, débil para identificar",
        blocks: [
          { type: "p", text: "La imagen es útil cuando desconoces el nombre, está escrito en otro idioma o solo conservas una captura. Recorta conversaciones, precios, marcas de agua y objetos ajenos; mantén la silueta, los herrajes, el estampado y los bloques de color que distinguen el producto." },
          { type: "figure", image: "/products/headwear.webp", alt: "Gorra negra bordada sobre un fondo claro", caption: "Una imagen limpia y centrada ofrece más información visual que una foto de estilo de vida cargada. Ejemplo editorial, no resultado de FindQC." },
          { type: "p", text: "La Academy advierte de que la calidad y el ángulo afectan al reconocimiento. Prueba una segunda vista si los resultados son demasiado amplios. Una fotografía promocional puede ser reutilizada por varios vendedores, de modo que una miniatura idéntica solo crea una pista." },
          { type: "p", text: "Abre los candidatos y compara enlaces, tiendas, variantes, medidas y sets QC. La coincidencia visual más cercana no es necesariamente la fuente original ni el mismo lote." },
        ],
      },
      {
        id: "keyword-search",
        title: "4. Palabras clave: descubrimiento amplio con filtros",
        blocks: [
          { type: "p", text: "Las palabras clave funcionan cuando exploras una categoría o tienes varias pistas descriptivas. Empieza por términos concretos —tipo, material visible, color, modelo o detalle— y elimina adjetivos promocionales que cualquier vendedor podría utilizar." },
          { type: "p", text: "Prueba variantes en inglés y, cuando tenga sentido, el texto original copiado de la oferta. Cambia un elemento por vez para saber qué palabra mejora el resultado. Una consulta muy larga puede excluir una coincidencia válida por una diferencia mínima de redacción." },
          { type: "p", text: "Los resultados por palabras son una lista de candidatos, no una clasificación de calidad. Abre varias opciones, compara la fuente y guarda el enlace exacto de las que merezcan una revisión QC." },
        ],
      },
      {
        id: "verify",
        title: "5. Verifica todos los resultados con cuatro preguntas",
        blocks: [
          { type: "list", title: "Antes de confiar en una coincidencia", items: [
            "¿La plataforma, la tienda y el enlace corresponden a la oferta prevista?",
            "¿La variante, el color y el modelo coinciden con lo que quieres pedir?",
            "¿Las fotos QC pertenecen a esa oferta o solo a un producto visualmente parecido?",
            "¿La disponibilidad y las condiciones comerciales siguen vigentes en la página de compra?",
          ] },
          { type: "p", text: "La verificación debe ser igual aunque el primer resultado parezca perfecto. Los nombres, portadas y fotografías de catálogo se copian con facilidad; la combinación de identificadores es más fiable que un solo parecido." },
          { type: "callout", title: "Principio de búsqueda", text: "Utiliza FindQC para reducir el espacio de investigación, no para saltarte la comprobación de identidad." },
        ],
      },
      {
        id: "recovery",
        title: "6. Sigue una escalera de recuperación si falla el primer intento",
        blocks: [
          { type: "p", text: "Empieza con el enlace completo. Si falla, elimina únicamente parámetros de seguimiento y vuelve a probar. Después utiliza la portada limpia; si la imagen es genérica, recorta un detalle distintivo. Por último, combina nombre, modelo, categoría y un rasgo visible en una consulta breve." },
          { type: "p", text: "Conserva cada pista original. No sustituyas el enlace por una captura sin anotar de dónde salió, porque después necesitarás volver a la oferta comercial y comprobar la variante." },
          { type: "p", text: "Si ningún camino produce un resultado verificable, registra esa ausencia como incertidumbre. No inventes una relación entre dos artículos solo porque comparten estilo." },
        ],
      },
      {
        id: "sequence",
        title: "7. Una secuencia que conserva la evidencia",
        blocks: [
          { type: "p", text: "Guarda la URL, una captura con fecha y la variante. Busca primero por enlace, después por imagen y finalmente por palabras. Para cada candidato, anota por qué coincide y qué dato sigue faltando. Descarta los resultados que fallen la identidad aunque tengan mejores fotografías." },
          { type: "p", text: "Cuando encuentres un candidato sólido, pasa de la búsqueda a la lectura de las fotos: vistas generales, detalles, medidas y límites. Separar ambas fases evita que una buena imagen te convenza de que has localizado la oferta correcta." },
        ],
      },
    ],
    cta: { eyebrow: "Siguiente paso", title: "Convierte el resultado en una revisión QC ordenada", label: "Abrir la lista de fotos QC" },
  },

  "findqc-product-signals": {
    title: "Cómo leer Trending, Karma, reseñas y hauls de FindQC sin confiar demasiado",
    shortTitle: "Cómo interpretar las señales de FindQC",
    description: "Qué puede indicar cada señal comunitaria de FindQC, qué no demuestra y cómo combinarla con la oferta y las fotos QC.",
    excerpt: "Atención, preferencias, comentarios y paquetes enviados responden a preguntas distintas; ninguna señal sustituye la verificación del producto.",
    category: "Lectura de señales",
    readTime: "9 min de lectura",
    date: "20 de julio de 2026",
    heroAlt: "Accesorio de moda utilizado como ejemplo editorial de una señal de producto",
    keywords: ["FindQC Trending", "Karma FindQC", "reseñas FindQC", "Real Hauls", "señales de producto"],
    intro: [
      "Las señales sociales son útiles cuando se leen como contexto. Se vuelven peligrosas cuando se transforman en un sello de calidad que la propia señal nunca prometió. FindQC presenta Trending, Karma, Review Wall y Real Hauls como áreas diferentes, por lo que conviene preguntar primero qué observación alimenta cada una.",
      "El objetivo no es ignorar a la comunidad, sino utilizar sus datos sin borrar fechas, variantes, lotes y tamaños de muestra. Una señal ayuda a formular mejores preguntas; la oferta y las fotos de tu unidad siguen siendo las pruebas principales.",
    ],
    sections: [
      {
        id: "map",
        title: "1. Relaciona cada señal con la pregunta correcta",
        blocks: [
          { type: "table", headers: ["Señal", "Pregunta útil", "No demuestra"], rows: [
            ["Trending", "¿Qué atrae atención ahora?", "Calidad o durabilidad"],
            ["Karma", "¿Qué productos prefiere la comunidad?", "Especificaciones verificadas"],
            ["Review Wall", "¿Qué observó un comprador?", "Que otra variante será idéntica"],
            ["Real Hauls", "¿Qué apareció en un paquete enviado?", "Coste o resultado repetible"],
          ] },
          { type: "p", text: "Estas categorías pueden orientar el descubrimiento y mostrar vocabulario, problemas o comparaciones que merece la pena investigar. No convierten observaciones históricas en garantías para un pedido futuro." },
          { type: "p", text: "Antes de usar una señal, anota fecha, enlace, variante y número de ejemplos visibles. Cuanto más incompleto sea ese contexto, menos peso debe recibir." },
        ],
      },
      {
        id: "trending",
        title: "2. Trending mide atención, no resistencia",
        blocks: [
          { type: "p", text: "Un producto puede ser tendencia porque es nuevo, barato, estacional, polémico o fácil de compartir. El volumen de visitas no revela si la costura soportará uso, si la talla es coherente o si el vendedor mantiene el mismo lote." },
          { type: "p", text: "Trending resulta útil para descubrir candidatos recientes y comprobar qué detalles interesan a otras personas. Después debes salir de la clasificación, abrir la oferta y revisar los registros QC disponibles." },
          { type: "list", title: "Preguntas antes de seguir una tendencia", items: [
            "¿La oferta sigue activa y pertenece al mismo vendedor?",
            "¿Hay varias fotos QC recientes o solo una portada popular?",
            "¿Las reseñas hablan de la variante que te interesa?",
            "¿La atención se debe a precio, novedad o evidencia de producto?",
          ] },
        ],
      },
      {
        id: "karma",
        title: "3. Karma es un filtro comunitario, no una ficha técnica",
        blocks: [
          { type: "p", text: "Karma puede ayudar a localizar favoritos repetidos de la comunidad. Esa preferencia agrega una valoración, pero no especifica por sí misma medidas, composición, tolerancias de fabricación ni condiciones de devolución." },
          { type: "p", text: "Compara la fecha y el enlace de los votos con la oferta actual. Una tienda puede cambiar imágenes, variantes o proveedor sin cambiar una URL visible. Utiliza Karma para priorizar la investigación, no para aprobar automáticamente." },
          { type: "figure", image: "/products/watch.webp", alt: "Accesorio utilizado como ejemplo editorial", caption: "La popularidad ayuda a descubrir un candidato; los detalles de la oferta y la evidencia QC determinan qué puede afirmarse sobre él." },
        ],
      },
      {
        id: "reviews",
        title: "4. Lee observaciones, no solo puntuaciones",
        blocks: [
          { type: "p", text: "Una reseña aporta valor cuando describe algo comprobable: medida, color, pieza faltante, alineación, textura percibida o experiencia con una variante. Un “perfecto” sin enlace, fecha ni fotografía ofrece poca información transferible." },
          { type: "p", text: "Distingue hechos observados de interpretaciones. “La cinta muestra 68 cm” es reproducible; “talla normal” depende del cuerpo y de las expectativas del autor. Busca patrones entre varias reseñas independientes." },
          { type: "list", title: "Da más peso cuando la reseña", items: [
            "Identifica oferta, talla, color y fecha.",
            "Incluye fotos que respaldan la observación.",
            "Explica qué se esperaba y qué se recibió.",
            "Coincide con otros registros recientes sin copiar su lenguaje.",
          ] },
          { type: "p", text: "Incluso una reseña detallada describe una unidad concreta. Úsala para saber qué revisar en la tuya, no para asumir que el resultado se repetirá." },
        ],
      },
      {
        id: "hauls",
        title: "5. Un haul muestra una ruta completada, no un resultado repetible",
        blocks: [
          { type: "p", text: "Real Hauls puede demostrar que ciertos artículos aparecieron juntos en un paquete y llegaron a una etapa de envío. No fija el coste para otro país, fecha, peso volumétrico, ruta o declaración aduanera." },
          { type: "p", text: "Tampoco convierte cada producto del paquete en una recomendación. Comprueba si hay comentarios específicos, fotos de almacén y enlaces vigentes. Un paquete atractivo en conjunto puede ocultar poca información sobre cada unidad." },
          { type: "p", text: "Utiliza los hauls para aprender cómo otras personas agrupan artículos, qué dimensiones pueden importar y qué preguntas logísticas investigar después con tu agente." },
        ],
      },
      {
        id: "triangulate",
        title: "6. Triangula señales, oferta y evidencia QC",
        blocks: [
          { type: "p", text: "La señal comunitaria propone un candidato. La página original confirma identidad, variante y condiciones comerciales. Los registros QC históricos muestran ejemplos visibles. Las fotos de tu almacén muestran la unidad vinculada al pedido. Cada capa responde a una pregunta distinta." },
          { type: "callout", title: "Regla de peso", text: "Cuanto más cerca esté una prueba de tu unidad, variante y fecha de compra, más importante debe ser para la decisión." },
          { type: "p", text: "Si las capas se contradicen, no promedies sin investigar. Una puntuación alta no corrige una medida equivocada en tu foto; una foto antigua impecable no anula una marca visible en la unidad actual." },
        ],
      },
      {
        id: "scorecard",
        title: "7. Crea una pequeña ficha de evidencia",
        blocks: [
          { type: "list", title: "Registra cinco líneas", items: [
            "Identidad: plataforma, tienda, URL y variante.",
            "Actualidad: fecha de la oferta y de las señales consultadas.",
            "Patrones: observaciones repetidas en reseñas o QC.",
            "Unidad propia: medidas, defectos visibles y piezas incluidas.",
            "Incertidumbres: vistas, pruebas o condiciones que faltan.",
          ] },
          { type: "p", text: "No necesitas una fórmula complicada. Marca cada línea como confirmada, dudosa o desconocida y escribe la prueba que justifica la etiqueta." },
          { type: "p", text: "Una decisión sólida puede incluir señales sociales débiles si la identidad y la evidencia de tu unidad son fuertes. Lo contrario no funciona: mucha popularidad no compensa una oferta incierta o unas fotos incompatibles con el pedido." },
          { type: "p", text: "Conserva la ficha junto al enlace y las capturas. Te permitirá comparar pedidos futuros sin depender de una impresión vaga." },
        ],
      },
    ],
    cta: { eyebrow: "Aplica el contexto", title: "Revisa lo que una foto QC puede demostrar realmente", label: "Leer los límites de las fotos QC" },
  },

  "what-qc-photos-can-prove": {
    title: "Qué pueden —y qué no pueden— mostrar las fotos QC de FindQC antes del envío",
    shortTitle: "Límites reales de las fotos QC",
    description: "Cómo separar defectos visibles, medidas y piezas comprobables de afirmaciones que una fotografía de almacén no puede demostrar.",
    excerpt: "Una imagen responde bien a preguntas visuales concretas, pero no certifica autenticidad, material, comodidad ni durabilidad futura.",
    category: "Fundamentos QC",
    readTime: "9 min de lectura",
    date: "20 de julio de 2026",
    heroAlt: "Prenda fotografiada como ejemplo editorial para una inspección QC",
    keywords: ["fotos QC FindQC", "revisión de almacén", "límites de fotos QC", "medidas QC", "control antes del envío"],
    intro: [
      "Las fotografías de almacén son valiosas porque convierten algunas preguntas abstractas en observaciones visibles. También crean una falsa sensación de certeza cuando se les pide demostrar características que no aparecen en el encuadre. Una buena revisión empieza formulando preguntas que una imagen realmente puede responder.",
      "FindQC señala que gran parte del material QC, el peso, las dimensiones y los defectos procede de agentes externos, y no garantiza exactitud, integridad o autenticidad. Esa limitación no vuelve inútiles los registros: obliga a leerlos con un alcance correcto.",
    ],
    sections: [
      {
        id: "source",
        title: "1. Comprende de dónde procede la evidencia",
        blocks: [
          { type: "p", text: "FindQC agrega y organiza material de terceros. La plataforma de investigación no toma necesariamente las fotografías, no compra el artículo y no controla la transacción. Una fecha, un agente o una variante diferentes pueden producir otro conjunto de imágenes." },
          { type: "p", text: "Un registro público puede representar una unidad anterior. Las fotos que publica tu agente en tu cuenta se refieren al pedido actual y, por tanto, deben recibir mayor peso, siempre que confirmes que el número de pedido y la variante coinciden." },
          { type: "callout", title: "Jerarquía de evidencia", text: "Usa los registros públicos para investigar la oferta y las fotos de tu almacén para decidir sobre la unidad concreta." },
        ],
      },
      {
        id: "visible",
        title: "2. Lo que una foto clara suele mostrar",
        blocks: [
          { type: "p", text: "Las vistas generales pueden revelar color equivocado, pieza ausente, asimetría evidente, deformación, daño de transporte o diferencia entre el producto recibido y la variante pedida. Los primeros planos pueden mostrar costuras, bordes de estampado, arañazos, manchas, herrajes y etiquetas visibles." },
          { type: "p", text: "La confianza aumenta cuando el mismo indicio aparece desde dos ángulos y con una referencia de escala. Una marca presente en una sola imagen oscura puede ser polvo, reflexión o compresión; pide una vista adicional antes de clasificarla como defecto." },
          { type: "figure", image: "/products/shoes-60.jpg", alt: "Zapatillas grises utilizadas como ejemplo editorial", caption: "Una vista completa sirve para comprobar par, forma y color; los primeros planos responden a preguntas sobre uniones y superficies. Ejemplo editorial." },
          { type: "p", text: "También puedes comprobar si aparecen accesorios, cordones, correas, placas o embalajes prometidos, aunque conviene contrastarlos con la lista exacta de la oferta." },
        ],
      },
      {
        id: "measurements",
        title: "3. Las medidas responden preguntas de ajuste si se leen bien",
        blocks: [
          { type: "p", text: "Una cinta visible puede convertir una impresión de tamaño en un número comprobable. En ropa, compara ancho de pecho, largo, hombros, mangas, cintura o entrepierna según la prenda. En calzado, pide plantilla cuando el ajuste interior sea la cuestión; en bolsos, registra las tres dimensiones externas." },
          { type: "p", text: "El método importa tanto como el número. Comprueba que la cinta empieza en cero, no se curva sobre una superficie gruesa y utiliza los mismos puntos que tu prenda de referencia. El ancho de pecho en plano no equivale al contorno del cuerpo." },
          { type: "p", text: "Acepta una tolerancia razonable por colocación y lectura, pero investiga las diferencias que cambien el uso previsto. Una foto borrosa con un extremo oculto no resuelve la duda aunque muestre una cinta." },
        ],
      },
      {
        id: "cannot-prove",
        title: "4. Lo que normalmente no puede demostrar una fotografía",
        blocks: [
          { type: "list", title: "Mantén estas afirmaciones fuera de la imagen", items: [
            "Composición, grado o seguridad química del material.",
            "Autenticidad o certificación de marca.",
            "Durabilidad tras semanas de uso o varios lavados.",
            "Comodidad, olor, tacto o caída sobre tu cuerpo.",
            "Salud de batería, rendimiento interno o impermeabilidad real.",
            "Defectos situados fuera del encuadre o bajo una capa cerrada.",
          ] },
          { type: "p", text: "Una textura que parece lisa puede sentirse rígida; un dispositivo que enciende puede tener poca autonomía; una costura exterior correcta no revela su refuerzo interno. Para esas características necesitas especificaciones, pruebas funcionales, políticas de devolución o experiencia de uso, no solo píxeles." },
          { type: "p", text: "Las Condiciones de FindQC indican además que el contenido QC puede contener errores y que el servicio no certifica autenticidad. No presentes una foto agregada como si fuera un informe pericial." },
        ],
      },
      {
        id: "photo-problems",
        title: "5. Separa problemas del producto y problemas de fotografía",
        blocks: [
          { type: "p", text: "La iluminación cambia el tono, un gran angular deforma bordes, una prenda doblada parece asimétrica y el plástico protector crea reflejos. Antes de rechazar, pregunta si el supuesto defecto permanece en otra orientación y bajo luz uniforme." },
          { type: "p", text: "Por el contrario, no descartes una marca nítida como “mala cámara” si aparece en varias tomas. Describe su posición respecto a una costura, etiqueta o regla para que el almacén pueda encontrarla." },
          { type: "figure", image: "/products/tshirt.webp", alt: "Camiseta utilizada para explicar pliegues e iluminación", caption: "Los pliegues y las sombras pueden cambiar la silueta aparente. Pide una colocación plana cuando la forma sea decisiva." },
        ],
      },
      {
        id: "request",
        title: "6. Pide pruebas adicionales con una finalidad concreta",
        blocks: [
          { type: "p", text: "Una petición útil indica el punto, el ángulo y la razón. “Más fotos” puede producir otra vista general que no resuelva nada. Señala, por ejemplo, “primer plano del borde izquierdo del estampado bajo luz blanca” o “plantilla con ambos extremos de la cinta visibles”." },
          { type: "list", title: "Peticiones que responden preguntas", items: [
            "Etiqueta de talla junto al número de pedido para confirmar variante.",
            "Dos ángulos de una posible marca para distinguir reflejo y daño.",
            "Medida plana con los puntos de inicio y final visibles.",
            "Foto de todos los accesorios fuera del embalaje.",
            "Prueba funcional concreta si el agente ofrece ese servicio.",
          ] },
          { type: "p", text: "Consulta antes si la foto o prueba adicional tiene coste y qué ocurre con los plazos de devolución. La mejor solicitud llega mientras todavía existe una opción práctica de actuar." },
        ],
      },
      {
        id: "decision",
        title: "7. Utiliza tres estados de decisión",
        blocks: [
          { type: "p", text: "Aceptar significa que la identidad coincide y la evidencia disponible no muestra un problema que supere tu tolerancia. No significa que la foto garantice todas las propiedades." },
          { type: "p", text: "Pedir más evidencia significa que la duda es visual y puede resolverse con una medida, otro ángulo o una prueba disponible. Es una decisión activa, no una espera indefinida." },
          { type: "p", text: "Rechazar o solicitar cambio significa que existe una diferencia confirmada y relevante, sujeta a las normas del agente y del vendedor. Guarda capturas y explica el punto exacto." },
          { type: "p", text: "Este sistema evita dos extremos: aprobar por entusiasmo ante unas pocas imágenes o rechazar por una sombra ambigua. La decisión se vincula a evidencia y tolerancias declaradas." },
        ],
      },
    ],
    cta: { eyebrow: "Ponlo en práctica", title: "Aplica una secuencia completa antes de aprobar el envío", label: "Abrir la guía de compra" },
  },

  "findqc-shopping-agent-workflow": {
    title: "Cómo usar FindQC con un agente de compra: del enlace a la decisión de almacén",
    shortTitle: "De FindQC a la decisión de almacén",
    description: "Un flujo claro para investigar en FindQC, entregar la oferta exacta al agente, revisar tu unidad y separar la aceptación del producto de la preparación del paquete.",
    excerpt: "Mantén separadas la investigación, la transacción y la evidencia de almacén para saber qué plataforma responde de cada paso.",
    category: "Proceso con agentes",
    readTime: "10 min de lectura",
    date: "20 de julio de 2026",
    heroAlt: "Chaqueta utilizada como ejemplo editorial de un pedido mediante agente",
    keywords: ["FindQC agente de compra", "comprar con FindQC", "fotos de almacén", "enlace Taobao agente", "proceso QC"],
    intro: [
      "FindQC y un agente de compra intervienen en momentos distintos. FindQC ayuda a descubrir y organizar registros; el vendedor ofrece el producto; el agente puede comprar, recibir, fotografiar, almacenar y enviar según sus propias condiciones. Confundir esas funciones dificulta saber dónde comprobar un precio o solicitar una solución.",
      "El proceso más seguro conserva un registro desde el primer enlace hasta la decisión de almacén. Así puedes comparar la variante pedida con la recibida, dar mayor peso a las fotos de tu unidad y resolver dudas antes de invertir tiempo en optimizar el envío internacional.",
    ],
    sections: [
      {
        id: "separate",
        title: "1. Separa investigación y transacción",
        blocks: [
          { type: "p", text: "Las Condiciones de FindQC explican que la plataforma no presta servicios de compra o forwarding. Los pagos, el transporte y las devoluciones los gestionan terceros, y algunos enlaces pueden dirigir a agentes." },
          { type: "p", text: "Cuando una cifra o una política afecte a tu dinero, confírmala en la interfaz de la parte responsable. El precio actual pertenece a la oferta; las tarifas, fotos adicionales, almacenamiento y rutas pertenecen al agente; los impuestos y restricciones dependen también del destino." },
          { type: "table", headers: ["Etapa", "Fuente principal", "Qué confirmar"], rows: [
            ["Investigación", "FindQC y fuente original", "Identidad, registros y preguntas"],
            ["Compra", "Vendedor y agente", "Variante, precio y devolución"],
            ["Almacén", "Cuenta del agente", "Unidad, medidas y defectos visibles"],
            ["Envío", "Agente y transportista", "Peso, ruta, seguro y restricciones"],
          ] },
        ],
      },
      {
        id: "candidate",
        title: "2. Crea un registro del candidato",
        blocks: [
          { type: "p", text: "Antes de abrir el agente, guarda la URL completa, la tienda, una captura fechada, el color, la talla, el modelo y las piezas incluidas. Copia también la tabla de medidas y las condiciones que podrían cambiar." },
          { type: "p", text: "Añade una breve lista de riesgos específicos de la categoría. Para zapatos puede ser plantilla, simetría y adhesivo; para chaquetas, medidas, cremallera y paneles; para electrónica, modelo, enchufe y prueba funcional disponible." },
          { type: "list", title: "Ficha mínima", items: [
            "Enlace y plataforma de origen.",
            "Tienda o vendedor visible.",
            "Variante exacta y cantidad.",
            "Medidas o accesorios indispensables.",
            "Fecha y condiciones relevantes de la oferta.",
          ] },
        ],
      },
      {
        id: "research",
        title: "3. Investiga sin confundir historial con stock",
        blocks: [
          { type: "p", text: "Busca el enlace en FindQC y comprueba que el resultado coincide. Los registros anteriores pueden revelar ángulos, medidas o problemas repetidos, pero una foto histórica no demuestra que la variante esté disponible hoy ni que el lote actual sea idéntico." },
          { type: "p", text: "Si la página indica que el vendedor eliminó el producto, trata las fotos como archivo. Vuelve a la oferta o al agente para conocer disponibilidad. No uses una imagen conservada como confirmación comercial." },
          { type: "figure", image: "/products/jacket.webp", alt: "Chaqueta oscura utilizada como ejemplo editorial", caption: "Los registros históricos orientan las preguntas de inspección; la oferta en directo confirma qué puede comprarse ahora." },
        ],
      },
      {
        id: "handoff",
        title: "4. Entrega al agente la fuente y la variante exactas",
        blocks: [
          { type: "p", text: "Pega el enlace original y selecciona la variante con atención. Si el agente permite observaciones, escribe únicamente datos verificables: color, talla, modelo y accesorio. Evita instrucciones ambiguas como “el de la foto” cuando la página contiene muchas opciones." },
          { type: "p", text: "Antes de pagar, confirma precio del artículo, transporte nacional, tipo de cambio aplicado por el agente, posibles cargos de servicio y política de devolución. No copies una cifra histórica de FindQC como si fuera un presupuesto vigente." },
          { type: "callout", title: "Traspaso limpio", text: "El mismo enlace y la misma denominación de variante deben aparecer en tu ficha, en la orden del agente y en la revisión de almacén." },
        ],
      },
      {
        id: "warehouse",
        title: "5. Da el mayor peso a tus propias fotos de almacén",
        blocks: [
          { type: "p", text: "Cuando llegue el artículo, compara primero número de pedido, variante, color y cantidad. Después revisa vistas generales, detalles y medidas utilizando las preguntas que preparaste. No dejes que una antigua galería pública sustituya las imágenes de tu unidad." },
          { type: "p", text: "Si el agente ofrece un número limitado de fotos gratuitas o servicios adicionales, comprueba sus reglas actuales en la cuenta. Prioriza las vistas que cambien una decisión, no primeros planos decorativos." },
          { type: "list", title: "Orden de revisión", items: [
            "Coincidencia de pedido y variante.",
            "Forma general, color y cantidad.",
            "Detalles de construcción relevantes.",
            "Medidas comparables con tu referencia.",
            "Accesorios y daño visible de embalaje.",
          ] },
        ],
      },
      {
        id: "uncertainty",
        title: "6. Convierte la incertidumbre en una petición concreta",
        blocks: [
          { type: "p", text: "Describe la duda con ubicación y finalidad: “¿pueden fotografiar el borde derecho del estampado sin plástico?” o “¿pueden medir la plantilla de extremo a extremo?”. Una solicitud precisa permite comparar el resultado con un criterio." },
          { type: "p", text: "Pregunta por coste, tiempo y límite de devolución antes de encargar pruebas adicionales. Una respuesta que llega después del plazo comercial puede tener poco valor práctico." },
          { type: "p", text: "Si la característica no puede demostrarse mediante el servicio disponible —por ejemplo, durabilidad futura o composición— trátala como riesgo residual en lugar de pedir una foto incapaz de resolverla." },
        ],
      },
      {
        id: "parcel",
        title: "7. Aprueba el artículo antes de optimizar el paquete",
        blocks: [
          { type: "p", text: "No combines la decisión de calidad con la de envío. Primero acepta, solicita cambio o devuelve la unidad de acuerdo con las reglas. Solo después compara embalaje, retirada de cajas, refuerzo, peso real y volumétrico, rutas, seguro y restricciones." },
          { type: "p", text: "Un haul histórico puede aportar contexto, pero no ofrece un precio para tu combinación de destino, fecha, peso y volumen. Obtén la estimación dentro del agente cuando conozca los datos del paquete." },
          { type: "figure", image: "/products/electronics.webp", alt: "Accesorio electrónico utilizado como ejemplo editorial", caption: "Los artículos frágiles o con batería pueden necesitar comprobaciones y rutas específicas. Confirma las reglas actuales con el agente." },
        ],
      },
      {
        id: "audit",
        title: "8. Conserva un historial breve",
        blocks: [
          { type: "p", text: "Guarda la URL, la variante, las capturas de la oferta, las fotos del almacén, las medidas solicitadas y la decisión final. Añade fechas para distinguir información histórica y vigente." },
          { type: "p", text: "Si surge un problema, este registro te permite explicar qué se pidió y qué se recibió sin depender de una página que quizá haya cambiado. También mejora futuras compras porque podrás comparar vendedores, tallas y tipos de solicitud." },
          { type: "p", text: "Un buen historial no necesita ser extenso: debe conservar los identificadores y las pruebas que justificaron la decisión en cada etapa." },
        ],
      },
    ],
    cta: { eyebrow: "Empieza por la evidencia", title: "Utiliza FindQC con el método de búsqueda más preciso", label: "Comparar métodos de búsqueda" },
  },
};
