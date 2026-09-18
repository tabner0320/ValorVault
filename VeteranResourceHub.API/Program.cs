var builder = WebApplication.CreateBuilder(args);

// =========================================
// SERVICES
// =========================================

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// =========================================
// HTTP PIPELINE
// =========================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

// =========================================
// RESOURCE DATA
// =========================================

var resources = new List<VeteranResource>
{
    new(
        1,
        "Benefits",
        "Find information and resources related to veteran benefits and services.",
        "Explore information about disability compensation, pensions, VA benefits, claims assistance, and other veteran services.",
        new List<ResourceLink>
        {
            new(
                "VA Benefits",
                "https://www.va.gov/benefits/"
            ),
            new(
                "Disability Compensation",
                "https://www.va.gov/disability/"
            ),
            new(
                "File a VA Disability Claim",
                "https://www.va.gov/disability/file-disability-claim-form-21-526ez/"
            )
        }
    ),

    new(
        2,
        "Education",
        "Explore education, training, certifications, and career-development opportunities for veterans and their families.",
        "Learn about education benefits, GI Bill programs, scholarships, certifications, technical training, and other learning opportunities.",
        new List<ResourceLink>
        {
            new(
                "VA Education and Training",
                "https://www.va.gov/education/"
            ),
            new(
                "GI Bill Benefits",
                "https://www.va.gov/education/about-gi-bill-benefits/"
            ),
            new(
                "Compare GI Bill Benefits",
                "https://www.va.gov/education/gi-bill-comparison-tool/"
            )
        }
    ),

    new(
        3,
        "Employment",
        "Discover career resources and opportunities for veterans transitioning into civilian employment.",
        "Explore career-development resources, job-search assistance, resume support, apprenticeships, and veteran-friendly employment opportunities.",
        new List<ResourceLink>
        {
            new(
                "VA Veteran Readiness and Employment",
                "https://www.va.gov/careers-employment/vocational-rehabilitation/"
            ),
            new(
                "VA Careers and Employment",
                "https://www.va.gov/careers-employment/"
            ),
            new(
                "USAJOBS Veterans",
                "https://help.usajobs.gov/working-in-government/unique-hiring-paths/veterans"
            )
        }
    ),

    new(
        4,
        "Healthcare",
        "Explore healthcare information, programs, and services available to veterans and their families.",
        "Find information about healthcare programs, medical services, eligibility, wellness resources, and other veteran healthcare services.",
        new List<ResourceLink>
        {
            new(
                "VA Health Care",
                "https://www.va.gov/health-care/"
            ),
            new(
                "Apply for VA Health Care",
                "https://www.va.gov/health-care/how-to-apply/"
            ),
            new(
                "VA Health Care Eligibility",
                "https://www.va.gov/health-care/eligibility/"
            )
        }
    ),

    new(
        5,
        "Housing",
        "Find housing assistance, homeownership information, and resources designed to support veterans.",
        "Explore housing assistance, VA home loan information, homelessness prevention programs, and other housing resources.",
        new List<ResourceLink>
        {
            new(
                "VA Home Loans",
                "https://www.va.gov/housing-assistance/home-loans/"
            ),
            new(
                "VA Housing Assistance",
                "https://www.va.gov/housing-assistance/"
            ),
            new(
                "VA Homeless Programs",
                "https://www.va.gov/homeless/"
            )
        }
    ),

    new(
        6,
        "Community Support",
        "Connect with organizations, programs, and community resources that support veterans and military families.",
        "Discover veteran organizations, community programs, family resources, peer support, and local support services.",
        new List<ResourceLink>
        {
            new(
                "VA Resources and Support",
                "https://www.va.gov/resources/"
            ),
            new(
                "Find VA Locations",
                "https://www.va.gov/find-locations/"
            ),
            new(
                "Veterans Service Organizations",
                "https://www.va.gov/vso/"
            )
        }
    )
};

// =========================================
// API ENDPOINTS
// =========================================

// GET all veteran resource categories
app.MapGet("/api/resources", () =>
{
    return Results.Ok(resources);
})
.WithName("GetResources");

// GET one veteran resource category by ID
app.MapGet("/api/resources/{id:int}", (int id) =>
{
    var resource =
        resources.FirstOrDefault(resource => resource.Id == id);

    if (resource is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(resource);
})
.WithName("GetResourceById");

// =========================================
// START APPLICATION
// =========================================

app.Run();

// =========================================
// MODELS
// =========================================

record VeteranResource(
    int Id,
    string Title,
    string Description,
    string Details,
    List<ResourceLink> Links
);

record ResourceLink(
    string Name,
    string Url
);