package booking;

import com.intuit.karate.junit5.Karate;

/**
 * Ejecuta todos los .feature de este paquete (los marcados con @ignore son ayudantes y se omiten).
 * Reporte HTML: target/karate-reports/karate-summary.html
 */
class BookingTest {

    @Karate.Test
    Karate pruebasDeReservas() {
        return Karate.run().relativeTo(getClass());
    }
}
