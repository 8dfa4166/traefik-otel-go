package hello

import (
	"net/http"

	oapicodegen "hello/internal/infra/oapicodegen/hello"

	"github.com/labstack/echo/v4"
	"go.opentelemetry.io/otel"
)

func (Api) GetHello(ctx echo.Context) error {
	tracer := otel.GetTracerProvider()
	_, span := tracer.Tracer("api").Start(ctx.Request().Context(), "GetHello")
	defer span.End()

	return ctx.JSON(http.StatusOK, &oapicodegen.Hello{
		Message: "Hello, World!",
	})
}