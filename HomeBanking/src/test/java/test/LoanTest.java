package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.time.Duration;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

public class LoanTest {
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
    
    
    
    public void SolicitudPrestamo() {
    	System.out.println("INICIO DE TEST CP-LOAN-01");
    	
    	WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");

        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");

        WebElement ingresar = driver.findElement(By.id("login-btn"));
        ingresar.submit();
    	
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.xpath("//div[@data-balance='checking']//span[@class='balance-value']"),
                "125.450,75"
            )
        );
        
    	WebElement notificacion = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"dashboard-section\"]/div[2]/div[1]"))
        );
        String mensaje_tarjeta = notificacion.getText();
        System.out.println(mensaje_tarjeta);
        
    	
        WebElement seccion_prestamo = driver.findElement(By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[4]"));
    	seccion_prestamo.click();
    	
    	WebElement prestamo_form = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"loans-section\"]/div[2]/div[2]"))
        );
    	
    	WebElement monto = driver.findElement(By.xpath("//*[@id=\"loan-amount\"]"));
    	monto.sendKeys("100000");
    	
    	Select pagos = new Select(driver.findElement(By.id("loan-installments")));
        pagos.selectByIndex(1);
    	
        WebElement solicitar_button = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id=\"loan-form\"]/button")
            )
        );

        solicitar_button.submit();
        
        WebElement modal = wait.until(
        	    ExpectedConditions.visibilityOfElementLocated(
        	        By.id("modal-confirm")
        	    )
        	);
        modal.click();

        
        WebElement solicitar_button2 = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//*[@id=\"loan-form\"]/button")
                )
            );

            solicitar_button2.submit();
            
            WebElement modal2 = wait.until(
            	    ExpectedConditions.visibilityOfElementLocated(
            	        By.id("modal-confirm")
            	    )
            	);
            modal2.click();
            
            WebElement info = wait.until(
            	    ExpectedConditions.visibilityOfElementLocated(
            	        By.xpath("//*[@id=\"active-loans-list\"]/div[2]")
            	    )
            	);
            String info_prestamo = info.getText();
            System.out.println("INFORMACION DEL PRESTAMO");
            System.out.println(info_prestamo);
            assertTrue(info_prestamo.contains("$ 100.000,00"));
            assertTrue(info_prestamo.contains("DESISTIR"));
            assertTrue(info_prestamo.contains("PAGAR TOTAL"));
            assertTrue(info_prestamo.contains("Cuotas: 12"));
            assertTrue(info_prestamo.contains("Total a Pagar: $ 165.000,00"));
            
            WebElement inicio = driver.findElement(By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[1]"));
            inicio.click();
            
            wait.until(
                    ExpectedConditions.textToBePresentInElementLocated(
                        By.xpath("//div[@data-balance='checking']//span[@class='balance-value']"),
                        "225.450,75"
                    ));
            
            WebElement cuenta_corriente = driver.findElement(
                    By.xpath("//div[@data-balance='checking']//span[@class='balance-value']")
                );

                String saldo = cuenta_corriente.getText();
                System.out.println("SALDO ACTUALIZADO DE CUENTA CORRIENTE");
                System.out.println(saldo);
                
                
            assertEquals("❌ El monto no coincide","225.450,75",saldo.trim());
    	
    }
    
    
    
    public void validacionMontoMaximo(){
    	System.out.println("INICIO DE TEST CP-LOAN-02");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
    	WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");

        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");

        WebElement ingresar = driver.findElement(By.id("login-btn"));
        ingresar.submit();
        
        WebElement seccion_prestamo = driver.findElement(By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[4]"));
    	seccion_prestamo.click();
    	
    	WebElement prestamo_form = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"loans-section\"]/div[2]/div[2]"))
        );
    	
    	WebElement monto = driver.findElement(By.xpath("//*[@id=\"loan-amount\"]"));
    	monto.sendKeys("500001");
    	
    	Select pagos = new Select(driver.findElement(By.id("loan-installments")));
        pagos.selectByIndex(1);
    	
        WebElement solicitar_button = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id=\"loan-form\"]/button")
            )
        );

        solicitar_button.submit();
    	
        WebElement advertencia = driver.findElement(By.id("loan-amount"));
        
        String mensajeValidacion = advertencia.getAttribute("validationMessage");

        System.out.println(mensajeValidacion);
        
        assertTrue(
        	    mensajeValidacion.contains("El valor debe ser menor de o igual a 500000")
        	);
     // VALIDAR QUE NO APAREZCA EL MODAL DE CONFIRMACIÓN
        List<WebElement> modal = driver.findElements(
            By.id("modal-confirm")
        );

        assertTrue(
            "❌ El sistema permitió continuar con un monto inválido",
            modal.isEmpty()
        );
    }
    
    
    @Test
    public void cancelacionTotal() {
    	System.out.println("INICIO DE TEST CP-LOAN-03");
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	
    	WebElement username = driver.findElement(By.id("username"));
        username.sendKeys("demo");

        WebElement contraseña = driver.findElement(By.id("password"));
        contraseña.sendKeys("demo123");

        WebElement ingresar = driver.findElement(By.id("login-btn"));
        ingresar.submit();
        
        WebElement reset = driver.findElement(By.id("reset-demo-btn"));
        reset.click();
        
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                    By.xpath("//div[@data-balance='checking']//span[@class='balance-value']"),
                    "500.000,00"
                )
            );
        
        WebElement seccion_prestamo = driver.findElement(By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[4]"));
    	seccion_prestamo.click();
    	
    	WebElement prestamo_form = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"loans-section\"]/div[2]/div[2]"))
        );
    	
    	WebElement monto = driver.findElement(By.xpath("//*[@id=\"loan-amount\"]"));
    	monto.sendKeys("100000");
    	
    	Select pagos = new Select(driver.findElement(By.id("loan-installments")));
        pagos.selectByIndex(1);
    	
        WebElement solicitar_button = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//*[@id=\"loan-form\"]/button")
                )
            );

            solicitar_button.submit();
            
            WebElement modal = wait.until(
            	    ExpectedConditions.visibilityOfElementLocated(
            	        By.id("modal-confirm")
            	    )
            	);
            modal.click();

            
            WebElement solicitar_button2 = wait.until(
                    ExpectedConditions.elementToBeClickable(
                        By.xpath("//*[@id=\"loan-form\"]/button")
                    )
                );

                solicitar_button2.submit();
                
                WebElement modal2 = wait.until(
                	    ExpectedConditions.visibilityOfElementLocated(
                	        By.id("modal-confirm")
                	    )
                	);
                modal2.click();
                
                WebElement info = wait.until(
                	    ExpectedConditions.visibilityOfElementLocated(
                	        By.xpath("//*[@id=\"active-loans-list\"]/div[2]")
                	    )
                	);
                String info_prestamo = info.getText();
                System.out.println("INFORMACION DEL PRESTAMO");
                System.out.println(info_prestamo);
                assertTrue(info_prestamo.contains("$ 100.000,00"));
                assertTrue(info_prestamo.contains("DESISTIR"));
                assertTrue(info_prestamo.contains("PAGAR TOTAL"));
                assertTrue(info_prestamo.contains("Cuotas: 12"));
                assertTrue(info_prestamo.contains("Total a Pagar: $ 165.000,00"));
                
                WebElement inicio = driver.findElement(By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[1]"));
                inicio.click();
                
                wait.until(
                        ExpectedConditions.textToBePresentInElementLocated(
                            By.xpath("//div[@data-balance='checking']//span[@class='balance-value']"),
                            "600.000,00"
                        ));
                
                WebElement cuenta_corriente = driver.findElement(
                        By.xpath("//div[@data-balance='checking']//span[@class='balance-value']")
                    );

                    String saldo = cuenta_corriente.getText();
                    System.out.println("SALDO ACTUALIZADO DE CUENTA CORRIENTE");
                    System.out.println(saldo);
                    
                    
                assertEquals("❌ El monto no coincide","600.000,00",saldo.trim());
                
                WebElement seccion_prestamo2 = driver.findElement(By.xpath("//*[@id=\"app-view\"]/div/aside/ul/li[4]"));
            	seccion_prestamo2.click();
            	
            	WebElement pagar_button = driver.findElement(By.xpath("//*[@id=\"active-loans-list\"]/div[2]/div[1]/div/button[2]"));
            	pagar_button.click();
            	
            	WebElement modal3 = wait.until(
                	    ExpectedConditions.visibilityOfElementLocated(
                	        By.id("modal-confirm")
                	    )
                	);
            	modal3.click();
            	
            	String prestamos = driver.findElement(
            		    By.id("active-loans-list")
            		).getText();

            		System.out.println(prestamos);

            		assertFalse(
            		    "❌ El préstamo de $100.000 sigue apareciendo en activos",
            		    prestamos.contains("$ 100.000,00")
            		);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @After
    public void tearDown() {
        
    }

    @AfterClass
    public static void tearDownAfterClass() {
        System.out.println("FINALIZA LOS TESTS");
    }
}
