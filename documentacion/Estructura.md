## Estructura
Json Page requiere de un JSON, en el cual se implementan tres atributos principales:

### Layouts

Contiene la distribuccion de la pagina, etiquetas y estilos Css, los cuales representan la pagina. Cada item en Layout, puede tener de manera interna distintas divisiones, las cuales son configuradas en la definicion de sub-layout.

Los atributos que puede contener un layout son:
* **tab** : Es el tab HTML(div, br,ul,il, etc.)
* **id** : Identificador unico en el DOM
* **title** : Atributo title
* **attributes** : Es un objecto que puede contener los atributos HTML(css, class, width, height, etc.) que tendra el tab.
* **sublayouts** : Lista de Layout que estan dentro del tab.

Entrada Layout
```javascript
	{"layout" :[
		{
			"tab":"div",
			"id":"principal",
			"title":"Principal",
			"attributes": {
				"class":"clase",
				"height":"20px",
				"width":"100px"
			},
			"sublayouts":[
				{
					"tab":"div",
					"id":"secundario1",
					"title":"Secundario",
					"attributes": {
						"class":"clase2",
						"height":"20px",
						"width":"100px"
					},
					"sublayouts":[
					]
				},
				{
					"tab":"div",
					"id":"secundario2",
					"title":"Secundario",
					"attributes": {
						"class":"clase3",
						"height":"20px",
						"width":"100px"
					},
					"sublayouts":[
					]
				}
			]
		}
	]}
```
Salida HTML
```html
<div id="principal" title="Principal" class="clase" height="20px" width="100px">
	<div id="secundario1" title="Secundario" class="clase2" height="20px" width="100px">
	</div>
	<div id="secundario2" title="Secundario" class="clase3" height="20px" width="100px">
	</div>
</div>
```