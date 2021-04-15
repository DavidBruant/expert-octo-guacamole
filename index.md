---
scripts:
    - src: "./build/bundle.js"
      defer: true
styles:
    - href: "./build/bundle.css"
---

# Sankey budg

<section class="anim"></section>


<section class="content"></section>

<style>
main{
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
}

@media (min-width: 640px) {
    main{
        max-width: none;
    }
}

.content svg{
    max-width: 60em;
}
</style>