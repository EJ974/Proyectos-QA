package test;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.time.Duration;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

public class DashboardTest {
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
    
    
    public void visualizacionCuentaCorriente() {
    	System.out.println("INICIO DE TEST CP-DASH-01");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"dashboard-section\"]/div[2]/div[1]"))
        );
        String mensaje_tarjeta = notificacion.getText();
        System.out.println(mensaje_tarjeta);
        
        assertTrue("❌ No se encontró la tarjeta Cuenta Corriente",mensaje_tarjeta.toLowerCase().contains("cuenta corriente"));


            System.out.println("✅ Se encontró la tarjeta Cuenta Corriente");
     
        System.out.println("FIN DE TEST CP-DASH-01");
    }
    
    
    public void visualizacionCajaAhorro() {
    	System.out.println("INICIO DE TEST CP-DASH-02");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"dashboard-section\"]/div[2]/div[2]"))
        );
        String mensaje_tarjeta = notificacion.getText();
        System.out.println(mensaje_tarjeta);
        
        assertTrue("❌ No se encontró la tarjeta Caja de Ahorro",mensaje_tarjeta.toLowerCase().contains("caja de ahorro"));

            System.out.println("✅ Se encontró la tarjeta Caja de Ahorro");
     
        System.out.println("FIN DE TEST CP-DASH-02");
    }
    
    
    public void visualizacionTarjetaCredito() {
    	System.out.println("INICIO DE TEST CP-DASH-03");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"dashboard-section\"]/div[2]/div[3]"))
        );
        String mensaje_tarjeta = notificacion.getText();
        System.out.println(mensaje_tarjeta);
        
        assertTrue("❌ No se encontró la tarjeta de Crédito",mensaje_tarjeta.toLowerCase().contains("tarjeta de crédito"));

            System.out.println("✅ Se encontró la tarjeta de Crédito");
     
        System.out.println("FIN DE TEST CP-DASH-03");
    }
    
    
    public void visualizacionUltimosMovimientos() {
    	System.out.println("INICIO DE TEST CP-DASH-04");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");
        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");
        WebElement ingresar = driver.findElement(By.xpath("//*[@id=\"login-btn\"]"));
        ingresar.submit();
        
        WebElement movimientos = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"dashboard-section\"]/div[3]"))
        );
        String mensaje_movimientos = movimientos.getText();
        System.out.println(mensaje_movimientos);
        
        assertTrue("❌ No se encontró la seccion Últimos Movimientos",mensaje_movimientos.toLowerCase().contains("últimos movimientos"));

            System.out.println("✅ Se encontró la seccion Últimos Movimientos");
     
        System.out.println("FIN DE TEST CP-DASH-04");
    }
    
    
    public void resetSaldos_CuentaCorriente() {
    	System.out.println("INICIO DE TEST CP-DASH-05");

        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");

        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");

        WebElement ingresar = driver.findElement(By.id("login-btn"));
        ingresar.submit();

        WebElement pago_servicio = driver.findElement(
            By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[5]")
        );
        pago_servicio.click();

        Select pagos = new Select(
            driver.findElement(By.id("service-select"))
        );
        pagos.selectByIndex(2);

        WebElement pagar = driver.findElement(
            By.xpath("//*[@id=\"service-details\"]/button")
        );
        pagar.click();

        WebElement inicio = driver.findElement(
            By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[1]")
        );
        inicio.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='checking']//span[@class='balance-value']"),
                "121.250,75"
            )
        );

        WebElement balance = driver.findElement(
            By.xpath("//div[@data-balance='checking']//span[@class='balance-value']")
        );

        String monto = balance.getText();

        System.out.println("Monto 1 encontrado: " + monto);
        
        WebElement reset = driver.findElement(By.xpath("//*[@id=\"reset-demo-btn\"]"));
        reset.click();
        
        WebElement confirm_button = driver.findElement(By.xpath("//*[@id=\"modal-confirm\"]"));
        confirm_button.click();
        
        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait2.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='checking']//span[@class='balance-value']"),
                "500.000,00"
            )
        );

        WebElement balance2 = driver.findElement(
            By.xpath("//div[@data-balance='checking']//span[@class='balance-value']")
        );

        String monto2 = balance2.getText();

        System.out.println("Monto 2 encontrado: " + monto2);
        
        assertNotEquals("❌ Los montos son iguales",monto,monto2);
        
        assertEquals("❌ El monto no coincide","500.000,00",monto2.trim());

        System.out.println("FIN DE TEST CP-DASH-05");
    }
    
    @Test
    public void resetSaldos_CajaAhorro() {
    	System.out.println("INICIO DE TEST CP-DASH-06");

        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");

        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");

        WebElement ingresar = driver.findElement(By.id("login-btn"));
        ingresar.submit();

        WebElement pago_servicio = driver.findElement(
            By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[5]")
        );
        pago_servicio.click();

        Select pagos = new Select(
            driver.findElement(By.id("service-select"))
        );
        pagos.selectByIndex(3);

        Select cuentas = new Select(
            driver.findElement(By.id("service-account"))
        );
        cuentas.selectByIndex(1);

        WebElement pagar = driver.findElement(
            By.xpath("//*[@id=\"service-details\"]/button")
        );
        pagar.click();

        WebElement inicio = driver.findElement(
            By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[1]")
        );
        inicio.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='savings']//span[@class='balance-value']"),
                "86.520,50"
            )
        );

        WebElement balance = driver.findElement(
            By.xpath("//div[@data-balance='savings']//span[@class='balance-value']")
        );

        String monto = balance.getText();

        System.out.println("Monto 1 encontrado: " + monto);
        
        WebElement reset = driver.findElement(By.xpath("//*[@id=\"reset-demo-btn\"]"));
        reset.click();
        
        WebElement confirm_button = driver.findElement(By.xpath("//*[@id=\"modal-confirm\"]"));
        confirm_button.click();
        
        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait2.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='savings']//span[@class='balance-value']"),
                "250.000,00"
            )
        );

        WebElement balance2 = driver.findElement(
            By.xpath("//div[@data-balance='savings']//span[@class='balance-value']")
        );

        String monto2 = balance2.getText();

        System.out.println("Monto 2 encontrado: " + monto2);
        
        assertNotEquals("❌ Los montos son iguales",monto,monto2);
        
        assertEquals("❌ El monto no coincide","250.000,00",monto2.trim());

        System.out.println("FIN DE TEST CP-DASH-06");
    }
    
    
    public void resetSaldos_TarjetaCredito() {
    	System.out.println("INICIO DE TEST CP-DASH-07");

        WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");

        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");

        WebElement ingresar = driver.findElement(By.id("login-btn"));
        ingresar.submit();

        WebElement pago_servicio = driver.findElement(
            By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[5]")
        );
        pago_servicio.click();

        Select pagos = new Select(
            driver.findElement(By.id("service-select"))
        );
        pagos.selectByIndex(1);

        Select cuentas = new Select(
            driver.findElement(By.id("service-account"))
        );
        cuentas.selectByIndex(2);

        WebElement pagar = driver.findElement(
            By.xpath("//*[@id=\"service-details\"]/button")
        );
        pagar.click();

        WebElement inicio = driver.findElement(
            By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[1]")
        );
        inicio.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='credit']//span[@class='balance-value']"),
                "36.500,00"
            )
        );

        WebElement balance = driver.findElement(
            By.xpath("//div[@data-balance='credit']//span[@class='balance-value']")
        );

        String monto = balance.getText();

        System.out.println("Monto 1 encontrado: " + monto);
        
        WebElement reset = driver.findElement(By.xpath("//*[@id=\"reset-demo-btn\"]"));
        reset.click();
        
        WebElement confirm_button = driver.findElement(By.xpath("//*[@id=\"modal-confirm\"]"));
        confirm_button.click();
        
        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait2.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='credit']//span[@class='balance-value']"),
                "45.000,00"
            )
        );

        WebElement balance2 = driver.findElement(
            By.xpath("//div[@data-balance='credit']//span[@class='balance-value']")
        );

        String monto2 = balance2.getText();

        System.out.println("Monto 2 encontrado: " + monto2);
        
        assertNotEquals("❌ Los montos son iguales",monto,monto2);
        
        assertEquals("❌ El monto no coincide","45.000,00",monto2.trim());

        System.out.println("FIN DE TEST CP-DASH-07");
    }
    
    
    
    
    @After
    public void tearDown() {
        
    }

    @AfterClass
    public static void tearDownAfterClass() {
        System.out.println("FINALIZA LOS TESTS");
    }
}
