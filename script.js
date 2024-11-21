document.getElementById("spin").addEventListener("click", function () {
    const wheel = document.querySelector(".wheel");
    const symbols = ["🔪", "⭐", "🔪", "⭐", "🔪"];
    
    // Definir rotação aleatória
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const rotation = 360 * 3 + randomIndex * (360 / symbols.length); // 3 giros + posição final

    // Animação da roleta
    wheel.style.transition = "transform 2s ease-out";
    wheel.style.transform = `translateX(-${randomIndex * 100}px)`;

    // Mostrar resultado
    setTimeout(() => {
        const result = symbols[randomIndex];
        document.getElementById("result").innerText = `Resultado: ${result}`;
        wheel.style.transition = "none"; // Resetar animação
    }, 2000);
});
