package test;

import java.time.Duration;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.junit.Assert;

// IMPORTANTE
import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginTest {

    // VARIABLES
    private WebDriver driver;
    private String URL = "https://homebanking-demo-tests.netlify.app/";

    @BeforeClass
    public static void setUpBeforeClass() {
        System.out.println("INICIO DE TESTS");
    }

    @Before
    public void setUp() {
        // 🔥 ESTO REEMPLAZA EL PATH DEL DRIVER
        WebDriverManager.chromedriver().setup();

        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Espera implícita global
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get(URL);
    }
    
    
    public void loginExitoso() {
    	System.out.println("INICIO DE TEST CP-AUTH-01");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("toast-container"))
        );
        String mensaje = notificacion.getText();
        System.out.println(mensaje);
        Assert.assertEquals("¡Bienvenido! Inicio de sesión exitoso",mensaje);
        
        System.out.println("FIN DE TEST CP-AUTH-01");
    }
    
    
    public void loginCredencialInvalida() {
    	System.out.println("INICIO DE TEST CP-AUTH-02");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("wrong");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("wrong");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("login-error"))
        );
        String mensaje_error = notificacion.getText();
        System.out.println(mensaje_error);
        Assert.assertTrue(mensaje_error.contains("Usuario o contraseña incorrectos"));
        
        System.out.println("FIN DE TEST CP-AUTH-02");
    }
    
    
    public void loginCuentaBloqueada() {
    	System.out.println("INICIO DE TEST CP-AUTH-03");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
    	WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("locked");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("locked");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("login-error"))
        );
        String mensaje_error = notificacion.getText();
        System.out.println(mensaje_error);
        Assert.assertTrue(mensaje_error.contains("Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte."));
        
        System.out.println("FIN DE TEST CP-AUTH-03");
    }
    
    
    public void logoutExitoso() {
    	System.out.println("INICIO DE TEST CP-AUTH-04");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(100));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
     // 🔥 1. Esperar que el botón logout exista
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("logout-btn")));

        // 🔥 2. Esperar que cualquier toast desaparezca (clave)
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector(".toast")));

        // 🔥 3. Click seguro (con fallback)
        try {
            WebElement btn_logout = wait.until(
                    ExpectedConditions.elementToBeClickable(By.id("logout-btn"))
            );
            btn_logout.click();
        } catch (Exception e) {
            // fallback por si el toast lo intercepta justo en ese momento
            WebElement btn_logout = driver.findElement(By.id("logout-btn"));
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].click();", btn_logout);
        }

        // CONFIRMAR LOGOUT
        WebElement btn_confirm = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("modal-confirm"))
        );
        btn_confirm.click();

        // VALIDACIÓN FINAL
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("toast-container"))
        );

        String mensaje = notificacion.getText();
        System.out.println(mensaje);

        // 🔥 Mejor validación (más flexible)
        Assert.assertTrue(mensaje.contains("Sesión cerrada correctamente"));

        System.out.println("FIN DE TEST CP-AUTH-04");
    }
    
    
    public void visualizacionDocumentacion() {
    	System.out.println("INICIO DE TEST CP-AUTH-05");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".docs-floating-panel"))
        );       
        System.out.println("FIN DE TEST CP-AUTH-05");
    }
    
    
    
    public void validarLinkPlanDePruebas() {
    	System.out.println("INICIO DE TEST CP-AUTH-06");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement boton = driver.findElement(By.cssSelector(".btn.btn-doc"));

        // ✅ Validar texto (corrigiendo salto de línea)
        String texto = boton.getText()
                .replace("\n", " ")
                .replace("\u00A0", " ")
                .trim()
                .replaceAll("\\s+", " ");

        System.out.println("TEXTO REAL: [" + texto + "]");

        Assert.assertTrue("El texto del botón no es correcto: " + texto,
                texto.toLowerCase().contains("plan de pruebas"));

        // ✅ Validar link sin click (más estable)
        String href = boton.getAttribute("href");
        System.out.println("HREF: " + href);

        Assert.assertTrue("La URL no es de Google Docs",
                href.contains("docs.google.com"));

        Assert.assertTrue("El documento no es el esperado",
                href.contains("1mw2tHUOUtaQeuTKEvuixQkx5sPYfQTgVr5d5Hxb17q8"));

        // Guardar ventana actual
        String ventanaOriginal = driver.getWindowHandle();

        // Click
        boton.click();

        // 🔥 Esperar nueva pestaña
        wait.until(driver -> driver.getWindowHandles().size() > 1);

        // Cambiar a nueva pestaña
        for (String ventana : driver.getWindowHandles()) {
            if (!ventana.equals(ventanaOriginal)) {
                driver.switchTo().window(ventana);
                break;
            }
        }

        // ✅ Validar URL final
        wait.until(ExpectedConditions.urlContains("docs.google.com"));

        String url = driver.getCurrentUrl();
        System.out.println("URL FINAL: " + url);

        Assert.assertTrue("No redireccionó a Google Docs",
                url.contains("docs.google.com/document"));

        // Cerrar pestaña nueva
        driver.close();

        // Volver a la original
        driver.switchTo().window(ventanaOriginal);
        
        System.out.println("INICIO DE TEST CP-AUTH-06");
    }
    
    @Test
    public void validarLinkDocFuncional() {
    	System.out.println("INICIO DE TEST CP-AUTH-07");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        List<WebElement> botones = driver.findElements(By.cssSelector(".btn.btn-doc"));

        WebElement boton = null;

        for (WebElement b : botones) {
            String texto = b.getText()
                    .replace("\n", " ")
                    .replace("\u00A0", " ")
                    .trim()
                    .toLowerCase();

            if (texto.contains("doc. funcional")) {
                boton = b;
                break;
            }
        }

        Assert.assertNotNull("No se encontró el botón Doc. Funcional", boton);

        // ✅ Validar link sin click (más estable)
        String href = boton.getAttribute("href");
        System.out.println("HREF: " + href);

        Assert.assertTrue("La URL no es de Google Docs",
                href.contains("docs.google.com"));

        Assert.assertTrue("El documento no es el esperado",
                href.contains("1KcJmUn0KpLSNQxVGpXlYsOVFYvabJrrsrYG_KFsHDq4"));

        // Guardar ventana actual
        String ventanaOriginal = driver.getWindowHandle();

        // Click
        boton.click();

        // 🔥 Esperar nueva pestaña
        wait.until(driver -> driver.getWindowHandles().size() > 1);

        // Cambiar a nueva pestaña
        for (String ventana : driver.getWindowHandles()) {
            if (!ventana.equals(ventanaOriginal)) {
                driver.switchTo().window(ventana);
                break;
            }
        }

        // ✅ Validar URL final
        wait.until(ExpectedConditions.urlContains("docs.google.com"));

        String url = driver.getCurrentUrl();
        System.out.println("URL FINAL: " + url);

        Assert.assertTrue("No redireccionó a Google Docs",
                url.contains("docs.google.com/document"));

        // Cerrar pestaña nueva
        driver.close();

        // Volver a la original
        driver.switchTo().window(ventanaOriginal);
        
        System.out.println("INICIO DE TEST CP-AUTH-07");
    }
    
    @After
    public void tearDown() {
        // 🔥 EVITA NULL POINTER
        if (driver != null) {
            driver.quit();
        }
    }

    @AfterClass
    public static void tearDownAfterClass() {
        System.out.println("FINALIZA LOS TESTS");
    }
}